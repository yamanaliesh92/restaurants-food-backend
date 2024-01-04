import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
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

@Controller('/api/users')
export class UserController {
  constructor(private readonly commanders: CommandBus) {}

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
}
