import { InternalServerErrorException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OrderDoa } from '../../db/doa/order.doa';
import { OrderDto } from '../../db/dto/Order.dto';
import { ModelMapperServiceOrder } from '../../db/service/modelMapperOrder.service';
import { UnKnowApplicationException } from '../../error/unKnow.appliaction.exception';
import { GetOneOrderCommand } from './get_one_order.command';

@CommandHandler(GetOneOrderCommand)
export class GetOneOrderCommandHandler
  implements ICommandHandler<GetOneOrderCommand>
{
  constructor(
    private readonly ordoa: OrderDoa,
    private readonly model: ModelMapperServiceOrder,
  ) {}

  async execute(command: GetOneOrderCommand): Promise<OrderDto> {
    try {
      const result = await this.ordoa.findOne({ id: command.id });
      return this.model.OrderToDto(result);
    } catch (Err) {
      throw new UnKnowApplicationException();
    }
  }
}
