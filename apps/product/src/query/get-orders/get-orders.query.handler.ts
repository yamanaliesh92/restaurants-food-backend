import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { OrderDoa } from '../../db/doa/order.doa';
import { ModelMapperServiceOrder } from '../../db/service/modelMapperOrder.service';
import { UnKnowApplicationException } from '../../error/unknown.application.exception';
import { GetOrdersQuery } from './get-orders.query';

@QueryHandler(GetOrdersQuery)
export class GetOrdersQueryHandler implements IQueryHandler<GetOrdersQuery> {
  constructor(
    private readonly productDoa: OrderDoa,
    private readonly model: ModelMapperServiceOrder,
  ) {}

  async execute() {
    try {
      const result = await this.productDoa.find();

      return result.map((o) => this.model.orderToDto(o));
    } catch (err) {
      throw new UnKnowApplicationException();
    }
  }
}
