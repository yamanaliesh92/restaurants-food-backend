import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { OrderDoa } from '../../db/doa/order.doa';
import { OrderDto } from '../../db/dto/Order.dto';
import { ModelMapperServiceOrder } from '../../db/service/modelMapperOrder.service';
import { UnKnowApplicationException } from '../../error/unknown.application.exception';
import { GetOrderQuery } from './get-order.query';

@QueryHandler(GetOrderQuery)
export class GetOrderQueryHandler implements IQueryHandler<GetOrderQuery> {
  constructor(
    private readonly orderDao: OrderDoa,
    private readonly model: ModelMapperServiceOrder,
  ) {}

  async execute(command: GetOrderQuery): Promise<OrderDto> {
    try {
      const result = await this.orderDao.findOne({ id: command.id });

      return this.model.orderToDto(result);
    } catch (Err) {
      throw new UnKnowApplicationException();
    }
  }
}
