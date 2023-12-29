import { InternalServerErrorException } from '@nestjs/common';

export class BcMock {
  async hashPassword() {
    throw new InternalServerErrorException('something went wrong');
  }

  async comparePassword() {
    throw new InternalServerErrorException('something went wrong');
  }
}
