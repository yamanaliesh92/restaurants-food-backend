import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { RestaurantDoa } from '../../db/doa/restaurant.doa';
import { UnKnowApplicationException } from '../../error/unknown.application.exception';
import { UpdateRestaurantInfoCommand } from './update.restaurant.info.command';

@CommandHandler(UpdateRestaurantInfoCommand)
export class UpdateRestaurantInfoCommandHandler
  implements ICommandHandler<UpdateRestaurantInfoCommand>
{
  constructor(private readonly dao: RestaurantDoa) {}

  async execute(command: UpdateRestaurantInfoCommand): Promise<boolean> {
    try {
      return await this.dao.update(command.id, {
        address: command.address,
        name: command.name,
      });
    } catch (err) {
      throw new UnKnowApplicationException();
    }
  }
}
