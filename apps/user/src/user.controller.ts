import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChangePasswordCommand } from './command/change_password/change_password.command';

import { CreateUserCommand } from './command/create_User/create_User.command';

import { GetOneUserCommand } from './command/get_one_user/get_one_user.command';
import { LoginCommand } from './command/login/login.coomand';

import { UpdateImgCommand } from './command/update-img/update.img.command';
import { UpdateUserCommand } from './command/update_user/update_user.command';
import { CreateUserDto } from './dto/create.user.dto';
import { LoginUserDto } from './dto/login.dto';
import { UpdateUserNameDto } from './dto/update.usernaem.dto';
import { AxiosErrorApplicationException } from './error/axios.application.exception';
import { UserNotFoundApplicationException } from './error/user-not-found.apllication.exception';
import { UserAlreadyExistApplicationException } from './error/user.alreday.exist.application';
import { AuthGuard, IRequest } from './shared/userGaurd';

@Controller('/api/users')
export class UserController {
  constructor(private readonly commanders: CommandBus) {}

  @Post()
  @UseInterceptors(FileInterceptor('img'))
  async createUser(
    @Body() body: CreateUserDto,

    @UploadedFile() img: Express.Multer.File,
  ) {
    try {
      return await this.commanders.execute(
        new CreateUserCommand({
          email: body.email,
          img: img.buffer.toString('base64'),
          username: body.username,
          password: body.password,
        }),
      );
    } catch (err) {
      if (err instanceof UserAlreadyExistApplicationException) {
        throw new BadRequestException('user already exist');
      }

      if (err instanceof AxiosErrorApplicationException) {
        throw new BadRequestException(
          'some thing went wrong in upload your img try again',
        );
      }
      throw new InternalServerErrorException('some things went wrong');
    }
  }

  @UseGuards(AuthGuard)
  @Patch('update')
  @UseInterceptors(FileInterceptor('img'))
  updateImg(@Req() req: IRequest, @UploadedFile() img: Express.Multer.File) {
    Logger.log('img', img);
    return this.commanders.execute(
      new UpdateImgCommand({
        id: req.user.id,
        img: img.buffer.toString('base64'),
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Patch()
  async updateUserName(
    @Req() req: IRequest,
    @Body() { username }: UpdateUserNameDto,
  ) {
    try {
      return await this.commanders.execute(
        new UpdateUserCommand({
          id: req.user.id,
          username: username,
        }),
      );
    } catch (err) {
      throw new InternalServerErrorException(
        'some thing went wrong try again..',
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async getMe(@Req() request: IRequest) {
    try {
      return await this.commanders.execute(
        new GetOneUserCommand({
          id: request.user.id,
        }),
      );
    } catch (error) {
      throw new InternalServerErrorException('some thing went wrong');
    }
  }

  @EventPattern('update.password')
  updatePassword(@Payload(ValidationPipe) body: ChangePasswordCommand) {
    Logger.log('body in controller', { body });
    return this.commanders.execute(
      new ChangePasswordCommand({
        password: body.password,
        id: body.id,
      }),
    );
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
      throw new InternalServerErrorException(
        'some thing went wrong try again..',
      );
    }
  }

  // @UseGuards(AuthGuard('jwt'))

  // @UseGuards(AuthGuard('jwt-refresh'))
  @EventPattern('updateName.user')
  refreshToken(@Req() req: IRequest) {
    const user = req.user['id'];
    // const users = req.user.id;
    // return this.commanders.execute(
    // new UpdateUserNameCommand({ id: body.id, username: body.username }),
    // );
  }
}
