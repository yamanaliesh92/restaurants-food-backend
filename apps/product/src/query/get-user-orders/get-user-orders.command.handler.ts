import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { OrderDoa } from '../../db/doa/order.doa';
import { ModelMapperServiceOrder } from '../../db/service/modelMapperOrder.service';
import { UnKnowApplicationException } from '../../error/unknown.application.exception';
import { GetOrdersQueryByUserId } from './getAllOrdersByUserId.command';

@QueryHandler(GetOrdersQueryByUserId)
export class GetAllOrdersByUserIdQueryHandler
  implements IQueryHandler<GetOrdersQueryByUserId>
{
  readonly #logger = new Logger(this.constructor.name);

  constructor(
    private readonly productDoa: OrderDoa,
    private readonly model: ModelMapperServiceOrder,
  ) {}

  async execute(command: GetOrdersQueryByUserId): Promise<any> {
    try {
      const result = await this.productDoa.find({ userId: command.userId });

      return result.map((o) => this.model.orderToDto(o));
    } catch (err) {
      this.#logger.error(err);

      throw new UnKnowApplicationException();
    }
  }
}
