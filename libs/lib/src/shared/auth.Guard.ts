import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

import { TokenISValidApplicationException } from '../error/token.appliactionException';
import { Jwt } from './jwt.service';

const HEADER_NAME = 'authorization';
const REFRESH_NAME = 'refresh';

export interface IRequest {
  user: {
    id: number;
  };
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwt: Jwt) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const token = request.headers[HEADER_NAME];
    Logger.log('token', token);
    const refToken = request.headers[REFRESH_NAME];
    Logger.log('token', refToken);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwt.verify(token);

      Logger.log({ payload });

      request['user'] = payload;
      return true;
    } catch (err) {
      if (err instanceof TokenISValidApplicationException) {
        try {
          const payloadRefreshToken = await this.jwt.verifyRefreshTone(
            refToken,
          );

          const id = payloadRefreshToken.id;

          const token = await this.jwt.sign({ id: id });
          const refreshToken = await this.jwt.refreshToken({ id: id });

          request['new_tokens'] = { token, refreshToken };
          request['user'] = { id };

          return true;
        } catch (error) {
          throw new BadRequestException('s');
        }
      }

      throw new InternalServerErrorException('some');
    }
  }
}
