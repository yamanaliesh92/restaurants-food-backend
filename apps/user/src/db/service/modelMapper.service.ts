import { Injectable, Logger } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { User } from '../model/user.model';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class ModelMapperService {
  toUser(entity: UserEntity): User {
    Logger.log('entity', { entity });
    return new User({
      id: entity.id,
      createdAt: entity.cratedAt,
      updatedAt: entity.updatedAt,
      email: entity.email,
      username: entity.username,
      password: entity.password,
      img: entity.img,
    });
  }

  modelToDto(data: User): UserDto {
    return new UserDto({
      id: data.id,
      email: data.email,
      username: data.username,
      img: data.img,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}
