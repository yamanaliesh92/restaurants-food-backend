import { InternalServerErrorException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OrderDoa } from '../../db/doa/order.doa';
import { UnKnowApplicationException } from '../../error/unknown.application.exception';
import { DeleteOrderCommand } from './delete_order.command';

@CommandHandler(DeleteOrderCommand)
export class DeleteOrderCommandHandler
  implements ICommandHandler<DeleteOrderCommand>
{
  constructor(private readonly orderdoa: OrderDoa) {}

  async execute(command: DeleteOrderCommand): Promise<boolean> {
    try {
      return await this.orderdoa.delete(command.id);
    } catch (err) {
      throw new UnKnowApplicationException();
    }
  }
}
