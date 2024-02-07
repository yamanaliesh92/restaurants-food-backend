import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { CqrsModule } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';

import { Bc } from 'y/lib/shared/bc.service';
import { Jwt } from 'y/lib/shared/jwt.service';

import { CreateUserCommandHandler } from './command/create-user/create-user.command.handler';

import { GetOneUserQueryHandler } from './query/get-user/get-user.query.handler';
import { LoginCommandHandler } from './command/login/login.command.handler';

import { UpdateUserCommandHandler } from './command/update-user/update_user.command.handler';
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
    JwtService,
    LoginCommandHandler,
    GetOneUserQueryHandler,
  ],
})
export class UserModule {}
