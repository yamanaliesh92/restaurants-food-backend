import { InternalServerErrorException } from '@nestjs/common';

export class UserDoaMock {
  async update() {
    throw new InternalServerErrorException('some thing went wrong');
  }

  async delete() {
    throw new InternalServerErrorException('some thing went wrong');
  }

  async save() {
    throw new InternalServerErrorException('some thing went wrong');
  }

  async findOne() {
    throw new InternalServerErrorException('some thing went wrong');
  }
}
