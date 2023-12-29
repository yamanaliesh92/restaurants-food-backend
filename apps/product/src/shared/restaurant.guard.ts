import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GetOneRestaurantCommand } from '../command/get-one-restaurant/get-one-restaurant.command';
import { GetOneOrderCommand } from '../command/get_one_order/get_one_order.command';
import { OrderDto } from '../db/dto/Order.dto';

@Injectable()
export class RestaurantGuard {
  constructor(private readonly commandBus: CommandBus) {}

  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();
      const id = request.params.id;

      const userId = request.user.id;

      Logger.log('userId', { userId });

      const b = await this.commandBus.execute(
        new GetOneRestaurantCommand({ id: id }),
      );

      Logger.log('get', b);

      if (b.userId !== userId) {
        Logger.log('is not equal');
        return false;
      }

      return true;
    } catch (err) {
      Logger.error('Unknwon error in product guard', { err });
      return false;
    }
  }
}
