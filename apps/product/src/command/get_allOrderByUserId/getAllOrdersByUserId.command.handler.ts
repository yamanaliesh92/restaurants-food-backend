import { InternalServerErrorException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EntityNotFoundError } from 'typeorm';
import { OrderDoa } from '../../db/doa/order.doa';
import { ModelMapperServiceOrder } from '../../db/service/modelMapperOrder.service';
import { UnKnowApplicationException } from '../../error/unKnow.appliaction.exception';
import { GetAllOrderCommandByUserId } from './getAllOrdersByUserId.command';

@CommandHandler(GetAllOrderCommandByUserId)
export class GetAllOrdersByUserIdCommandHandler
  implements ICommandHandler<GetAllOrderCommandByUserId>
{
  constructor(
    private readonly productDoa: OrderDoa,
    private readonly model: ModelMapperServiceOrder,
  ) {}

  async execute(command: GetAllOrderCommandByUserId): Promise<any> {
    try {
      Logger.log('hehre in commda', { userID: command.userId });
      const result = await this.productDoa.find({ userId: command.userId });

      return result.map(this.model.OrderToDto);
    } catch (err) {
      throw new UnKnowApplicationException();
    }
  }
}
