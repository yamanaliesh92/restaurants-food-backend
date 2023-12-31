import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { CqrsModule } from '@nestjs/cqrs';

import { ClientsModule, Transport } from '@nestjs/microservices';

import { ChangePasswordCommandHandler } from './command/change_password/change_Password.command.handler';
import { CreateUserCommandHandler } from './command/create_User/create_User.command.handler';
import { DeleteUserCommandHandler } from './command/delete_user/delete_user.command.handler';
import { GetOneUserCommandHandler } from './command/get_one_user/get_one_user.command.handler';
import { LoginCommandHandler } from './command/login/login.command.handler';

import { UpdateImgCommandHandler } from './command/update-img/update.img.command.handler';
import { UpdateUserCommandHandler } from './command/update_user/update_user.command.handler';
import { DbUserModule } from './db/db.module';

import { Bc } from './shared/bc.service';
import { JwtService } from './shared/jwt.service';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [CqrsModule, HttpModule, DbUserModule],
  controllers: [UserController],
  providers: [
    UserService,
    Bc,
    JwtService,
    CreateUserCommandHandler,
    DeleteUserCommandHandler,
    UpdateUserCommandHandler,
    UpdateImgCommandHandler,
    ChangePasswordCommandHandler,
    LoginCommandHandler,
    GetOneUserCommandHandler,
  ],
})
export class UserModule {}
