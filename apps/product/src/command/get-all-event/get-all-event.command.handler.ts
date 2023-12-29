import { InternalServerErrorException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventDoa } from '../../db/doa/event.doa';

import { ModelMapperServiceEvent } from '../../db/service/modelMapperEvent.service';
import { UnKnowApplicationException } from '../../error/unKnow.appliaction.exception';

import { GetAllEventCommand } from './get-all-event.command';

@CommandHandler(GetAllEventCommand)
export class GetAllEventCommandHandler
  implements ICommandHandler<GetAllEventCommand>
{
  constructor(
    private readonly eventDoa: EventDoa,
    private readonly model: ModelMapperServiceEvent,
  ) {}

  async execute(command: GetAllEventCommand) {
    try {
      const result = await this.eventDoa.find();
      return result.map(this.model.EventToDto);
    } catch (err) {
      throw new UnKnowApplicationException();
    }
  }
}
