import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { CqrsModule } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';

import { AuthGuard } from 'y/lib/shared/auth.Guard';

import { Bc } from 'y/lib/shared/bc.service';
import { Jwt } from 'y/lib/shared/jwt.service';

import { CreateUserCommandHandler } from './command/create_User/create_User.command.handler';

import { GetOneUserCommandHandler } from './command/get_one_user/get_one_user.command.handler';
import { LoginCommandHandler } from './command/login/login.command.handler';

import { UpdateImgCommandHandler } from './command/update-img/update.img.command.handler';
import { UpdateUserCommandHandler } from './command/update_user/update_user.command.handler';
import { DbUserModule } from './db/db.module';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [CqrsModule, HttpModule, DbUserModule],
  controllers: [UserController],
  providers: [
    UserService,
    Bc,
    Jwt,
    CreateUserCommandHandler,
    UpdateUserCommandHandler,
    UpdateImgCommandHandler,
    JwtService,
    LoginCommandHandler,
    GetOneUserCommandHandler,
  ],
})
export class UserModule {}
