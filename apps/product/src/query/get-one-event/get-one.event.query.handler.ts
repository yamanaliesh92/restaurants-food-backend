import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { EventDoa } from '../../db/doa/event.doa';

import { NotFoundDataAccessException } from '../../db/error/notFoundError.access.exception';
import { ModelMapperServiceEvent } from '../../db/service/modelMapperEvent.service';
import { NotFoundApplicationException } from '../../error/record-not-found.application.exception';
import { UnKnowApplicationException } from '../../error/unknown.application.exception';
import { GetOneEventQuery } from './get-one.event.query';

@QueryHandler(GetOneEventQuery)
export class GetOneEventQueryHandler
  implements IQueryHandler<GetOneEventQuery>
{
  constructor(
    private readonly res: EventDoa,
    private readonly model: ModelMapperServiceEvent,
  ) {}

  async execute(command: GetOneEventQuery): Promise<any> {
    try {
      const result = await this.res.findOne({ id: command.id });

      return this.model.EventToDto(result);
    } catch (err) {
      if (err instanceof NotFoundDataAccessException) {
        throw new NotFoundApplicationException();
      }
      throw new UnKnowApplicationException();
    }
  }
}
