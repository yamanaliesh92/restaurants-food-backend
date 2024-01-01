import {
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Bc } from 'y/lib/shared/bc.service';
import { IPayloadJwt, Jwt } from 'y/lib/shared/jwt.service';
import { UserDoa } from '../../db/doa/user.doa';
import { RecordNotFoundDataAccessException } from '../../db/errors/record-not-found.exception';

import { UnKnowErrorApplicationException } from '../../error/unknow.error.application.exception';
import { UserNotFoundApplicationException } from '../../error/user-not-found.apllication.exception';

import { LoginCommand } from './login.coomand';

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand> {
  constructor(
    private readonly userdoa: UserDoa,
    private readonly bc: Bc,

    private readonly jwt: Jwt,
  ) {}

  async execute(command: LoginCommand): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    try {
      const user = await this.userdoa.findOne({ email: command.email });

      const correctPassword = await this.bc.comparePassword(
        user.password,
        command.password,
      );

      if (!correctPassword) {
        Logger.log('correct password', { correctPassword });
        throw new InternalServerErrorException(
          'email or password is not correct try again',
        );
      }

      const payload: IPayloadJwt = {
        id: user.id,
      };
      const token = await this.jwt.sign(payload);
      const refreshToken = await this.jwt.refreshToken(payload);
      return { accessToken: token, refreshToken: refreshToken };
    } catch (err) {
      Logger.log('error occurder in LoginCommandHandler', { err });
      if (err instanceof RecordNotFoundDataAccessException) {
        throw new UserNotFoundApplicationException();
      }
      throw new UnKnowErrorApplicationException();
    }
  }
}
