import { InternalServerErrorException } from '@nestjs/common';

export class ClientKafKaMock {
  async send() {
    throw new InternalServerErrorException('some thing went wrong');
  }
}
