import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { OrderDoa } from '../../db/doa/order.doa';
import { UnKnowApplicationException } from '../../error/unknown.application.exception';
import { UpdateOrderCommand } from './update-order.command';

@CommandHandler(UpdateOrderCommand)
export class UpdateOrderCommandHandler
  implements ICommandHandler<UpdateOrderCommand>
{
  constructor(private readonly orderDoa: OrderDoa) {}

  async execute(command: UpdateOrderCommand): Promise<boolean> {
    try {
      return await this.orderDoa.update(command.id, {
        ...(command.category ? { category: command.category } : {}),
        ...(command.description ? { description: command.description } : {}),
        ...(command.name ? { name: command.name } : {}),
        ...(command.price ? { price: command.price } : {}),
      });
    } catch (err) {
      throw new UnKnowApplicationException();
    }
  }
}
