import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserDoa } from '../../db/doa/user.doa';

import { UniqueConstraintViolationDataAccessException } from '../../db/errors/unique-constraint-violation.exception';
import { UnKnowErrorApplicationException } from '../../error/unknow.error.application.exception';

import { UpdateUserCommand } from './update_user.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler
  implements ICommandHandler<UpdateUserCommand>
{
  constructor(private readonly userdoa: UserDoa) {}

  async execute(command: UpdateUserCommand) {
    try {
      return await this.userdoa.update(command.id, {
        username: command.username,
      });
    } catch (Err) {
      throw new UnKnowErrorApplicationException();
    }
  }
}