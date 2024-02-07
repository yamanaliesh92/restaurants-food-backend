import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { AuthGuard, IRequest } from 'y/lib/shared/auth.Guard';

import { CreateUserCommand } from './command/create-user/create-user.command';

import { GetUserQuery } from './query/get-user/get-user.query';
import { LoginCommand } from './command/login/login.command';

import { UpdateUserCommand } from './command/update-user/update_user.command';
import { CreateUserDto } from './dto/create.user.dto';
import { LoginUserDto } from './dto/login.dto';
import { UpdateUserNameDto } from './dto/update.username.dto';
import { AxiosErrorApplicationException } from './error/axios.application.exception';
import { UserNotFoundApplicationException } from './error/user-not-found.application.exception';
import { UserAlreadyExistApplicationException } from './error/user.already.exist.application';
import { SendGridService } from '@anchan828/nest-sendgrid';
import { UserService } from './user.service';
import { CreatePaymentDto } from './dto/payment.dto';

@Controller('/api/users')
export class UserController {
  constructor(
    private readonly commanders: CommandBus,
    private readonly stripeService: UserService, // private readonly sendGrid: SendGridService,
  ) {}

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    try {
      const cmd = new CreateUserCommand({
        email: body.email,
        username: body.username,
        password: body.password,
      });

      return await this.commanders.execute(cmd);
    } catch (err) {
      if (err instanceof UserAlreadyExistApplicationException) {
        throw new BadRequestException('User with the same email already exist');
      }

      throw new InternalServerErrorException();
    }
  }

  @UseGuards(AuthGuard)
  @Patch()
  async updateUserName(
    @Req() req: IRequest,
    @Body() { username }: UpdateUserNameDto,
  ) {
    try {
      const cmd = new UpdateUserCommand({
        id: req.user.id,
        username: username,
      });

      return await this.commanders.execute(cmd);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async getMe(@Req() request: IRequest) {
    try {
      const cmd = new GetUserQuery({
        id: request.user.id,
      });
      return await this.commanders.execute(cmd);
    } catch (error) {
      throw new InternalServerErrorException('some thing went wrong');
    }
  }

  // @Post()
  // async root(): Promise<void> {
  //   await this.sendGrid.send({
  //     to: 'test@example.com',
  //     from: 'test@example.com',
  //     subject: 'Sending with SendGrid is Fun',
  //     text: 'and easy to do anywhere, even with Node.js',
  //     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  //   });
  // }

  @Post('login')
  async login(@Body() body: LoginUserDto) {
    try {
      return await this.commanders.execute(
        new LoginCommand({
          email: body.email,
          password: body.password,
        }),
      );
    } catch (err) {
      if (err instanceof UserNotFoundApplicationException) {
        throw new BadRequestException('email or password is not correct');
      }

      throw new InternalServerErrorException();
    }
  }

  @Post('payment/amount')
  checkout(@Body() body: CreatePaymentDto) {
    // Logger.log('am', amount);
    try {
      return this.stripeService.checkOut(body.amount);
    } catch (error) {
      return error;
    }
  }
}

// pk_test_51OXgiuAJ4nwhwATXWoW5buXWHVfQbiojFzUfDwJG3UsbDetZqLQe9X1WTWg8uRq9ps3B3T9AjcQAis5ebo0IgHbY00XDR6KbGX;

// secret-key="sk_test_51OXgiuAJ4nwhwATXX5L6YRNsZgZrZ5CZDxvm4sylrx82ur9pXlIEqx0Krai4cEYCq8RIkoy5rLx35l6ub5dNzccP00Svu5jbMa"
