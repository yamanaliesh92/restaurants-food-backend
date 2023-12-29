import { InternalServerErrorException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserDoa } from '../../db/doa/user.doa';
import { Bc } from '../../shared/bc.service';
import { ChangePasswordCommand } from './change_password.command';

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordCommandHandler
  implements ICommandHandler<ChangePasswordCommand>
{
  constructor(private readonly userdoa: UserDoa, private readonly bc: Bc) {}

  async execute(command: ChangePasswordCommand): Promise<any> {
    try {
      const hash = await this.bc.hashPassword(command.password);
      // return await this.userdoa.update({
      //   where: { id: command.id },
      //   update: { password: hash },
      // });
    } catch (Err) {
      Logger.log('error occurded during ChangePasswordCommandHandler ', {
        Err,
      });
      throw new InternalServerErrorException('some thing went wrong');
    }
  }
}
