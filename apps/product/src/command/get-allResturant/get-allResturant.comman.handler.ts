import { InternalServerErrorException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EntityNotFoundError } from 'typeorm';
import { RestaurantDoa } from '../../db/doa/restaurant.doa';
import { ModelMapperServiceRestaurant } from '../../db/service/modelMapper.resturant.service';
import { UnKnowApplicationException } from '../../error/unKnow.appliaction.exception';

import { GetAllRestaurantCommand } from './get-allResturant.command';

@CommandHandler(GetAllRestaurantCommand)
export class GetAllRestaurantCommandHandler
  implements ICommandHandler<GetAllRestaurantCommand>
{
  constructor(
    private readonly resDoa: RestaurantDoa,
    private readonly model: ModelMapperServiceRestaurant,
  ) {}

  async execute(command: GetAllRestaurantCommand): Promise<any> {
    try {
      const result = await this.resDoa.find({});

      return result.map(this.model.RestaurantToDto);
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        Logger.log('erroor not found any producy');
      }
      throw new UnKnowApplicationException();
    }
  }
}
