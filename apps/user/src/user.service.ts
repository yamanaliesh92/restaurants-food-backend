// import { CreateUserDto } from '@app/shared/dto/user/createUser.dto';
import { Injectable, Logger } from '@nestjs/common';
import { UserDoa } from './db/doa/user.doa';

@Injectable()
export class UserService {
  constructor(private readonly userdoa: UserDoa) {}

  async findOne() {
    return 'Dd';
  }

  async create(dto: any) {
    try {
      return 'dd';
    } catch (err) {
      Logger.log('error occruded during createUser');
    }
  }
}
