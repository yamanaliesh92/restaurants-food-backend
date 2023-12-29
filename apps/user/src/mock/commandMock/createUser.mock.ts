import { InternalServerErrorException } from '@nestjs/common';

export class CommandBusMock {
  async execute() {
    throw new InternalServerErrorException('some thing went wrong');
  }
}
