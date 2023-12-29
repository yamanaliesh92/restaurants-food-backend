import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

const secret = 'hhhrewre';

export interface IPayloadJwt {
  id: number;
}
@Injectable()
export class JwtService {
  async sign(payload: IPayloadJwt) {
    try {
      return jwt.sign(payload, secret);
    } catch (err) {
      Logger.log('error occurded during jwtService', { err });
      throw new InternalServerErrorException('some thing went wrong');
    }
  }

  async decode(token: string) {
    try {
      return jwt.decode(token);
    } catch (err) {
      Logger.log('error occurred during decode jwtService', { err });
      throw new InternalServerErrorException('some thing went wrong');
    }
  }
}
