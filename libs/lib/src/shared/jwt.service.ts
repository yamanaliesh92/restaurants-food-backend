import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { RefreshTokenISValidApplicationException } from '../error/refeshTokenIsVaild.appliactionException';
import { TokenISValidApplicationException } from '../error/token.appliactionException';

export interface IPayloadJwt {
  id: number;
}
@Injectable()
export class Jwt {
  readonly #logger = new Logger(this.constructor.name);

  constructor(
    private jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async verifyRefreshTone(token: string) {
    try {
      const secret = this.config.getOrThrow('SECRET_REFRESH_TOKEN');

      return await this.jwtService.verifyAsync(token, { secret });
    } catch (err) {
      throw new RefreshTokenISValidApplicationException();
    }
  }

  async verify(token: string) {
    try {
      const secret = this.config.getOrThrow('SECRET_REFRESH_TOKEN');

      return await this.jwtService.verifyAsync(token, { secret });
    } catch (err) {
      this.#logger.error('Error occurred during verifying token', err);

      throw new TokenISValidApplicationException();
    }
  }

  async sign(payload: IPayloadJwt) {
    try {
      const secret = this.config.getOrThrow('SECRET_REFRESH_TOKEN');

      return await this.jwtService.signAsync(payload, {
        secret,
        expiresIn: '1d',
      });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async refreshToken(payload: IPayloadJwt) {
    try {
      return await this.jwtService.signAsync(payload, {
        secret: `${process.env.SECRET_REFRESH_TOKEN}`,
        expiresIn: '7d',
      });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
