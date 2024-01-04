import { InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserDoa } from '../../db/doa/user.doa';
import { UserDto } from '../../db/dto/user.dto';
import { ModelMapperService } from '../../db/service/modelMapper.service';

import { GetUserQuery } from './get-user.query';

@CommandHandler(GetUserQuery)
export class GetOneUserCommandHandler implements ICommandHandler<GetUserQuery> {
  constructor(
    private readonly userDao: UserDoa,
    private readonly model: ModelMapperService,
  ) {}

  async execute(command: GetUserQuery): Promise<UserDto> {
    try {
      const result = await this.userDao.findOne({ id: command.id });

      return this.model.modelToDto(result);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
