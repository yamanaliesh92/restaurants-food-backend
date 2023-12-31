import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GetOneOrderCommand } from '../command/get_one_order/get_one_order.command';

@Injectable()
export class OrderGuard {
  constructor(private readonly commandBus: CommandBus) {}

  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();
      const id = request.params.id;

      const userId = request.user.id;

      Logger.log('userId', { userId });

      const result = await this.commandBus.execute(
        new GetOneOrderCommand({ id: id }),
      );

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
