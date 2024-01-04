import { Logger } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { EventDoa } from '../../db/doa/event.doa';
import { ModelMapperServiceEvent } from '../../db/service/modelMapperEvent.service';
import { UnKnowApplicationException } from '../../error/unknown.application.exception';

import { GetAllEventsQuery } from './get-all-event.query';

@QueryHandler(GetAllEventsQuery)
export class GetAllEventQueryHandler
  implements IQueryHandler<GetAllEventsQuery>
{
  readonly #logger = new Logger(this.constructor.name);

  constructor(
    private readonly eventDoa: EventDoa,
    private readonly model: ModelMapperServiceEvent,
  ) {}

  async execute() {
    try {
      const result = await this.eventDoa.find();

      return result.map(this.model.EventToDto);
    } catch (err) {
      this.#logger.error(err);

      throw new UnKnowApplicationException();
    }
  }
}
