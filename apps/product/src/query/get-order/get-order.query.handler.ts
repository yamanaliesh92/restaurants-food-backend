import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { OrderDoa } from '../../db/doa/order.doa';
import { OrderDto } from '../../db/dto/Order.dto';
import { NotFoundDataAccessException } from '../../db/error/notFoundError.access.exception';
import { ModelMapperServiceOrder } from '../../db/service/modelMapperOrder.service';
import { NotFoundApplicationException } from '../../error/record-not-found.application.exception';
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
    } catch (err) {
      if (err instanceof NotFoundDataAccessException) {
        throw new NotFoundApplicationException();
      }
      throw new UnKnowApplicationException();
    }
  }
}
