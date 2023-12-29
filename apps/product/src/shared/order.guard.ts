import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GetOneOrderCommand } from '../command/get_one_order/get_one_order.command';
import { OrderDto } from '../db/dto/Order.dto';

@Injectable()
export class OrderGuard {
  constructor(private readonly commandBus: CommandBus) {}

  async canActivate(context: ExecutionContext) {
    try {
      Logger.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDdd');
      const request = context.switchToHttp().getRequest();
      const id = request.params.id;

      const userId = request.user.id;

      Logger.log('userId', { userId });

      const b = await this.commandBus.execute(
        new GetOneOrderCommand({ id: id }),
      );

      Logger.log('get', b);

      // const getProduct = await this.carSer.getOneCar(id);
      // Logger.log('get', { getProduct });

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
