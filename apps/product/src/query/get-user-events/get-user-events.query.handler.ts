import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { EventDoa } from '../../db/doa/event.doa';
import { ModelMapperServiceEvent } from '../../db/service/modelMapperEvent.service';
import { UnKnowApplicationException } from '../../error/unknown.application.exception';
import { GetUserEventsQuery } from './get-user-events.query';

@QueryHandler(GetUserEventsQuery)
export class GetUserEVentsQueryHandler
  implements IQueryHandler<GetUserEventsQuery>
{
  readonly #logger = new Logger(this.constructor.name);

  constructor(
    private readonly eventDao: EventDoa,
    private readonly model: ModelMapperServiceEvent,
  ) {}

  async execute(command: GetUserEventsQuery): Promise<any> {
    try {
      const result = await this.eventDao.find({ userId: command.userId });

      return result.map(this.model.EventToDto);
    } catch (err) {
      this.#logger.error(err);

      throw new UnKnowApplicationException();
    }
  }
}
