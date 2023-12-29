import { InternalServerErrorException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserDoa } from '../../db/doa/user.doa';
import { DeleteUserCommand } from './delete_user.command';

@CommandHandler(DeleteUserCommand)
export class DeleteUserCommandHandler
  implements ICommandHandler<DeleteUserCommand>
{
  constructor(private readonly userdoa: UserDoa) {}

  async execute(command: DeleteUserCommand) {
    try {
      Logger.log('ddd');
      // const result = await this.userdoa.delete({ id: command.id });
      // Logger.log('result', { result });
      // if (result.affected === 0) {
      //   Logger.log('no affecretd', { result });
      //   return false;
      // }
      // return true;
    } catch (err) {
      Logger.log('error occurded during DleteUserCommnadHandler', { err });
      throw new InternalServerErrorException('some thing went wrong');
    }
  }
}
