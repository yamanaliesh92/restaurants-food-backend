import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { EntityNotFoundError } from 'typeorm';

import { RestaurantDoa } from '../../db/doa/restaurant.doa';
import { ModelMapperServiceRestaurant } from '../../db/service/modelMapper.restaurant.service';
import { UnKnowApplicationException } from '../../error/unknown.application.exception';

import { GetAllRestaurantQuery } from './get-restaurant.query';
import { NotFoundApplicationException } from '../../error/record-not-found.application.exception';
import { RestaurantDto } from '../../db/dto/restaurant.dto';

@QueryHandler(GetAllRestaurantQuery)
export class GetAllRestaurantQueryHandler
  implements IQueryHandler<GetAllRestaurantQuery>
{
  constructor(
    private readonly resDoa: RestaurantDoa,
    private readonly model: ModelMapperServiceRestaurant,
  ) {}

  async execute(): Promise<RestaurantDto[]> {
    try {
      const result = await this.resDoa.find();

      return result.map((r) => this.model.restaurantToDto(r));
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundApplicationException();
      }

      throw new UnKnowApplicationException();
    }
  }
}
