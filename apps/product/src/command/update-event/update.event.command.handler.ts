import { InternalServerErrorException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventDoa } from '../../db/doa/event.doa';
import { OrderDoa } from '../../db/doa/order.doa';
import { UnKnowApplicationException } from '../../error/unKnow.appliaction.exception';
import { UpdateEventCommand } from './update.event.command';

@CommandHandler(UpdateEventCommand)
export class UpdateEventCommandHandler
  implements ICommandHandler<UpdateEventCommand>
{
  constructor(private readonly eventDoa: EventDoa) {}

  async execute(command: UpdateEventCommand) {
    try {
      {
        command.name ? { name: command.name } : {};
      }

      {
        command.date ? { date: command.date } : {};
      }
      {
        command.newPrice ? { newPrice: command.newPrice } : {};
      }

      {
        command.oldPrice ? { oldPrice: command.oldPrice } : {};
      }

      {
        command.category ? { category: command.category } : {};
      }

      {
        command.description ? { description: command.description } : {};
      }

      return await this.eventDoa.update(command.id, {
        category: command.category,
        description: command.description,
        name: command.name,
        newPrice: command.newPrice,
        oldPrice: command.oldPrice,
        date: command.date,
      });
    } catch (err) {
      throw new UnKnowApplicationException();
    }
  }
}
