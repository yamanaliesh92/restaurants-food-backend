import { InternalServerErrorException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { OrderDoa } from '../../db/doa/order.doa';
import { ModelMapperServiceOrder } from '../../db/service/modelMapperOrder.service';
import { UnKnowApplicationException } from '../../error/unKnow.appliaction.exception';
import { GetAllOrderCommand } from './get_AllOrder.command';

@CommandHandler(GetAllOrderCommand)
export class GetAllOrderCommandHandler
  implements ICommandHandler<GetAllOrderCommand>
{
  constructor(
    private readonly productDoa: OrderDoa,
    private readonly model: ModelMapperServiceOrder,
  ) {}

  async execute(command: GetAllOrderCommand) {
    try {
      const result = await this.productDoa.find();
      return result.map(this.model.OrderToDto);
    } catch (err) {
      throw new UnKnowApplicationException();
    }
  }
}
