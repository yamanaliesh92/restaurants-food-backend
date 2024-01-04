import { InternalServerErrorException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventDoa } from '../../db/doa/event.doa';
import { OrderDoa } from '../../db/doa/order.doa';
import { UnKnowApplicationException } from '../../error/unknown.application.exception';
import { DeleteEventCommand } from './delete-event.command';

@CommandHandler(DeleteEventCommand)
export class DeleteEventCommandHandler
  implements ICommandHandler<DeleteEventCommand>
{
  constructor(private readonly eventdoa: EventDoa) {}

  async execute(command: DeleteEventCommand): Promise<boolean> {
    try {
      return await this.eventdoa.delete(command.id);
    } catch (err) {
      throw new UnKnowApplicationException();
    }
  }
}
