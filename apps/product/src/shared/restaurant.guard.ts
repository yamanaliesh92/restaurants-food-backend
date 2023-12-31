import { ExecutionContext, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GetOneRestaurantCommand } from '../command/get-one-restaurant/get-one-restaurant.command';

@Injectable()
export class RestaurantGuard {
  constructor(private readonly commandBus: CommandBus) {}

  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();
      const id = request.params.id;

      const userId = request.user.id;

      const result = await this.commandBus.execute(
        new GetOneRestaurantCommand({ id: id }),
      );

      if (result.userId !== userId) {
        return false;
      }

      return true;
    } catch (err) {
      return false;
    }
  }
}
