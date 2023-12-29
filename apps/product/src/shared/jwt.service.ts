import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class Jwt {
  async decode(token: string) {
    try {
      return await jwt.decode(token);
    } catch (err) {
      Logger.log('error in decode', { err });
      throw new InternalServerErrorException('some thing went wrong');
    }
  }
}
