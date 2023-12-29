import { HttpService } from '@nestjs/axios';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RestaurantDoa } from '../../db/doa/restaurant.doa';
import { CreateRestaurantEntityDto } from '../../db/dto/createResturant.entity.dto';
import { ModelMapperServiceRestaurant } from '../../db/service/modelMapper.resturant.service';
import { UnKnowApplicationException } from '../../error/unKnow.appliaction.exception';

import { CreateRestaurantCommand } from './create-resturant.command';

@CommandHandler(CreateRestaurantCommand)
export class CreateRestaurantCommandHandler
  implements ICommandHandler<CreateRestaurantCommand>
{
  constructor(
    private readonly resDoa: RestaurantDoa,
    private readonly modelMap: ModelMapperServiceRestaurant,
  ) {}

  async execute(command: CreateRestaurantCommand) {
    try {
      const model: CreateRestaurantEntityDto = {
        name: command.name,
        userId: command.userId,
        address: command.address,
      };

      const result = await this.resDoa.save(model);

      return this.modelMap.RestaurantToDto(result);
    } catch (err) {
      throw new UnKnowApplicationException();
    }
  }
}
