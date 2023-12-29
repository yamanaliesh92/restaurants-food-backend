import { InternalServerErrorException } from '@nestjs/common';

export class JwtServiceMock {
  async sign() {
    throw new InternalServerErrorException('some thing went wrong');
  }

  async decode() {
    throw new InternalServerErrorException('some thing went wrong');
  }
}
