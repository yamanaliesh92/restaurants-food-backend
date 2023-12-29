import { InternalServerErrorException } from '@nestjs/common';

export class CommandBusMocks {
  async execute() {
    throw new InternalServerErrorException('some thing went wrong');
  }
}
