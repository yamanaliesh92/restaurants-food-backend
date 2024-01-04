import { ExecutionContext, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetOneRestaurantQuery } from '../query/get-one-restaurant/get-one-restaurant.query';

@Injectable()
export class RestaurantGuard {
  constructor(private readonly queryBus: QueryBus) {}

  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();
      const id = request.params.id;

      const userId = request.user.id;

      const result = await this.queryBus.execute(
        new GetOneRestaurantQuery({ id: id }),
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
