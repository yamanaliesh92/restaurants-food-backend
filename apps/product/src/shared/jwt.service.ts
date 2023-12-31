import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class Jwt {
  async decode(token: string) {
    try {
      return await jwt.decode(token);
    } catch (err) {
      throw new InternalServerErrorException('some thing went wrong');
    }
  }
}
