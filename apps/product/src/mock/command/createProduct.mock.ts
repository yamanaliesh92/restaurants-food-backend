import { InternalServerErrorException } from '@nestjs/common';

export class CreateProductCommandHandlerMock {
  async execute() {
    throw new InternalServerErrorException('some thing went wrong');
  }
}
