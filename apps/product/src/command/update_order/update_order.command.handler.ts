import { InternalServerErrorException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OrderDoa } from '../../db/doa/order.doa';
import { UnKnowApplicationException } from '../../error/unKnow.appliaction.exception';
import { UpdateOrderCommand } from './upadte_order.command';

@CommandHandler(UpdateOrderCommand)
export class UpdateOrderCommandHandler
  implements ICommandHandler<UpdateOrderCommand>
{
  constructor(private readonly orderDoa: OrderDoa) {}

  async execute(command: UpdateOrderCommand) {
    try {
      {
        command.name ? { name: command.name } : {};
      }
      {
        command.price ? { price: command.price } : {};
      }

      {
        command.category ? { category: command.category } : {};
      }

      {
        command.description ? { description: command.description } : {};
      }

      return await this.orderDoa.update(command.id, {
        category: command.category,
        description: command.description,
        name: command.name,
        price: command.price,
      });
    } catch (err) {
      throw new UnKnowApplicationException();
    }
  }
}
