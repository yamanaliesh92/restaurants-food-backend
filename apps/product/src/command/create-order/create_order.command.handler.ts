import { HttpService } from '@nestjs/axios';
import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AxiosError } from 'axios';

import { lastValueFrom } from 'rxjs';
import { URLSearchParams } from 'url';
import { OrderDoa } from '../../db/doa/order.doa';
import { CreateOrderEntityDto } from '../../db/dto/createOrder.entity.dto';
import { OrderDto } from '../../db/dto/Order.dto';
import { ModelMapperServiceOrder } from '../../db/service/modelMapperOrder.service';
import { AxiosApplicationException } from '../../error/axios.application.exception';
import { UnKnowApplicationException } from '../../error/unknown.application.exception';
import { CreateOrderCommand } from './create_order.command';

@CommandHandler(CreateOrderCommand)
export class CreateOrderCommandHandler
  implements ICommandHandler<CreateOrderCommand>
{
  readonly #logger = new Logger(this.constructor.name);

  constructor(
    private readonly orderDao: OrderDoa,
    private readonly http: HttpService,
    private readonly model: ModelMapperServiceOrder,
  ) {}

  async execute(command: CreateOrderCommand): Promise<OrderDto> {
    try {
      const fromDate = new URLSearchParams();
      const imgOrder = command.imgOrder;
      const name = command.name;
      const price = command.price;
      const description = command.description;
      const userId = command.userId;
      const restaurantId = command.restaurantId;
      const category = command.category;

      fromDate.append('image', imgOrder);
      fromDate.append('name', category);
      fromDate.append('description', description);

      fromDate.append('name', name);
      fromDate.append('userId', String(userId));
      fromDate.append('price', String(price));
      fromDate.append('restaurantId', String(restaurantId));

      const { data } = await lastValueFrom(
        this.http.post(
          `https://api.imgbb.com/1/upload?key=898ab0c193c3ec2c099ca0cf8d071ee8`,
          fromDate,
        ),
      );

      const model: CreateOrderEntityDto = {
        name: command.name,
        price: command.price,
        userId: command.userId,
        description: command.description,
        restaurantId: command.restaurantId,
        category: command.category,
        imgOrder: data.data?.display_url,
      };
      const result = await this.orderDao.save(model);

      return this.model.orderToDto(result);
    } catch (err) {
      this.#logger.error(err);

      if (err instanceof AxiosError) {
        throw new AxiosApplicationException();
      }

      throw new UnKnowApplicationException();
    }
  }
}
