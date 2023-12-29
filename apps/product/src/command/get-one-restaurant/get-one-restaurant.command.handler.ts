import { InternalServerErrorException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { RestaurantDoa } from '../../db/doa/restaurant.doa';
import { NotFoundDataAccessException } from '../../db/error/notFoundError.access.exception';
import { NotFoundApplicationException } from '../../error/notFound.appliaction.exception';
import { UnKnowApplicationException } from '../../error/unKnow.appliaction.exception';
import { GetOneRestaurantCommand } from './get-one-restaurant.command';

@CommandHandler(GetOneRestaurantCommand)
export class GetOneRestaurantCommandHandler
  implements ICommandHandler<GetOneRestaurantCommand>
{
  constructor(private readonly res: RestaurantDoa) {}

  async execute(command: GetOneRestaurantCommand): Promise<any> {
    try {
      return await this.res.findOne({ id: command.id });
    } catch (err) {
      if (err instanceof NotFoundDataAccessException) {
        throw new NotFoundApplicationException();
      }
      throw new UnKnowApplicationException();
    }
  }
}
