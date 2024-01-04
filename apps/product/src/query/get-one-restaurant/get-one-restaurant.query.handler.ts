import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { RestaurantDoa } from '../../db/doa/restaurant.doa';
import { NotFoundDataAccessException } from '../../db/error/notFoundError.access.exception';
import { NotFoundApplicationException } from '../../error/record-not-found.application.exception';
import { UnKnowApplicationException } from '../../error/unknown.application.exception';
import { GetOneRestaurantQuery } from './get-one-restaurant.query';

@QueryHandler(GetOneRestaurantQuery)
export class GetOneRestaurantQueryHandler
  implements IQueryHandler<GetOneRestaurantQuery>
{
  constructor(private readonly res: RestaurantDoa) {}

  async execute(command: GetOneRestaurantQuery) {
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
