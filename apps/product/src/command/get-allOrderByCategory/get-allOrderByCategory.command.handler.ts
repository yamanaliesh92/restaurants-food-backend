import { InternalServerErrorException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EntityNotFoundError } from 'typeorm';
import { OrderDoa } from '../../db/doa/order.doa';
import { ModelMapperServiceOrder } from '../../db/service/modelMapperOrder.service';
import { UnKnowApplicationException } from '../../error/unKnow.appliaction.exception';
import { GetAllOrderByCategoryCommand } from './get-allOrderByCategory.command';

@CommandHandler(GetAllOrderByCategoryCommand)
export class GetAllOrdersByCategoryCommandHandler
  implements ICommandHandler<GetAllOrderByCategoryCommand>
{
  constructor(
    private readonly productDoa: OrderDoa,
    private readonly model: ModelMapperServiceOrder,
  ) {}

  async execute(command: GetAllOrderByCategoryCommand) {
    try {
      const result = await this.productDoa.find({ category: command.category });

      return result.map(this.model.OrderToDto);
    } catch (err) {
      throw new UnKnowApplicationException();
    }
  }
}
