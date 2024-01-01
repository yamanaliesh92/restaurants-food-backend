import {} from '@nestjs/axios';
import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AxiosError } from 'axios';

import { RestaurantDoa } from '../../db/doa/restaurant.doa';
import { AxiosApplicationException } from '../../error/axios.applaction.exception';
import { UnKnowApplicationException } from '../../error/unKnow.appliaction.exception';
import { UpdateRestaurantInfoCommand } from './update.resturant.info.command';

@CommandHandler(UpdateRestaurantInfoCommand)
export class UpdateRestaurantInfoCommandHandler
  implements ICommandHandler<UpdateRestaurantInfoCommand>
{
  constructor(private readonly res: RestaurantDoa) {}

  async execute(command: UpdateRestaurantInfoCommand): Promise<boolean> {
    try {
      return await this.res.update(command.id, {
        address: command.address,
        name: command.name,
      });
    } catch (err) {
      throw new UnKnowApplicationException();
    }
  }
}
