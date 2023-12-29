import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventDoa } from '../../db/doa/event.doa';

import { RestaurantDoa } from '../../db/doa/restaurant.doa';
import { NotFoundDataAccessException } from '../../db/error/notFoundError.access.exception';
import { ModelMapperServiceEvent } from '../../db/service/modelMapperEvent.service';
import { NotFoundApplicationException } from '../../error/notFound.appliaction.exception';
import { UnKnowApplicationException } from '../../error/unKnow.appliaction.exception';
import { GetOneEventCommand } from './get-one.event.command';

@CommandHandler(GetOneEventCommand)
export class GetOneEventCommandHandler
  implements ICommandHandler<GetOneEventCommand>
{
  constructor(
    private readonly res: EventDoa,

    private readonly model: ModelMapperServiceEvent,
  ) {}

  async execute(command: GetOneEventCommand): Promise<any> {
    try {
      const result = await this.res.findOne({ id: command.id });
      Logger.log('result', result);
      return this.model.EventToDto(result);
    } catch (err) {
      if (err instanceof NotFoundDataAccessException) {
        throw new NotFoundApplicationException();
      }
      throw new UnKnowApplicationException();
    }
  }
}
