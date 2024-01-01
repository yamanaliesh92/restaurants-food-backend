import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as bc from 'bcryptjs';
const salt = 10;
@Injectable()
export class Bc {
  async hashPassword(text: string) {
    try {
      return await bc.hash(text, salt);
    } catch (err) {
      Logger.log('error occurded during hash service', { err });
      throw new InternalServerErrorException('something went wrong');
    }
  }

  async comparePassword(hash: string, text: string) {
    try {
      return await bc.compare(text, hash);
    } catch (err) {
      Logger.log('error occurded during compare hash service', { err });
      throw new InternalServerErrorException('something went wrong');
    }
  }
}
