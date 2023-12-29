import { InternalServerErrorException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EntityNotFoundError } from 'typeorm';
import { EventDoa } from '../../db/doa/event.doa';
import { ModelMapperServiceEvent } from '../../db/service/modelMapperEvent.service';
import { ModelMapperServiceOrder } from '../../db/service/modelMapperOrder.service';
import { UnKnowApplicationException } from '../../error/unKnow.appliaction.exception';
import { GetAllEventsCommandByUserId } from './get.my.all.event.command';

@CommandHandler(GetAllEventsCommandByUserId)
export class GetAllEventsByUserIdCommandHandler
  implements ICommandHandler<GetAllEventsCommandByUserId>
{
  constructor(
    private readonly eventdoa: EventDoa,
    private readonly model: ModelMapperServiceEvent,
  ) {}

  async execute(command: GetAllEventsCommandByUserId): Promise<any> {
    try {
      const result = await this.eventdoa.find({ userId: command.userId });

      return result.map(this.model.EventToDto);
    } catch (err) {
      throw new UnKnowApplicationException();
    }
  }
}
