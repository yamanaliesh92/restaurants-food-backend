import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { OrderDoa } from '../../db/doa/order.doa';
import { ModelMapperServiceOrder } from '../../db/service/modelMapperOrder.service';
import { UnKnowApplicationException } from '../../error/unknown.application.exception';
import { GetOrdersByCategoryQuery } from './get-order-by-category.query';

@QueryHandler(GetOrdersByCategoryQuery)
export class GetAllOrdersByCategoryQueryHandler
  implements IQueryHandler<GetOrdersByCategoryQuery>
{
  readonly #logger = new Logger(this.constructor.name);

  constructor(
    private readonly productDoa: OrderDoa,
    private readonly model: ModelMapperServiceOrder,
  ) {}

  async execute(command: GetOrdersByCategoryQuery) {
    try {
      const result = await this.productDoa.find({ category: command.category });

      return result.map((r) => this.model.orderToDto(r));
    } catch (err) {
      this.#logger.error(err);

      throw new UnKnowApplicationException();
    }
  }
}
