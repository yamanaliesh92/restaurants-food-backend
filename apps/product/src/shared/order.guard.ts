import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetOrderQuery } from '../query/get-order/get-order.query';

@Injectable()
export class OrderGuard {
  constructor(private readonly queryBus: QueryBus) {}

  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();
      const id = request.params.id;

      const userId = request.user.id;

      const result = await this.queryBus.execute(new GetOrderQuery({ id }));

      if (result.userId !== userId) {
        Logger.log('is not equal');
        return false;
      }

      return true;
    } catch (err) {
      return false;
    }
  }
}
