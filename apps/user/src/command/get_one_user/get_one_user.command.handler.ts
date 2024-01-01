import { InternalServerErrorException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserDoa } from '../../db/doa/user.doa';
import { UserDto } from '../../db/dto/user.dto';
import { ModelMapperService } from '../../db/service/modelMapper.service';
import { UserNotFoundApplicationException } from '../../error/user-not-found.apllication.exception';

import { GetOneUserCommand } from './get_one_user.command';

@CommandHandler(GetOneUserCommand)
export class GetOneUserCommandHandler
  implements ICommandHandler<GetOneUserCommand>
{
  constructor(
    private readonly userdoa: UserDoa,
    private readonly model: ModelMapperService,
  ) {}
  async execute(command: GetOneUserCommand): Promise<UserDto> {
    try {
      const result = await this.userdoa.findOne({ id: command.id });

      return this.model.modelToDto(result);
    } catch (err) {
      Logger.log('error occurded getOneUserCommandHandler', { err });
      throw new InternalServerErrorException('some thing went wrong');
    }
  }
}
