import { HttpService } from '@nestjs/axios';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AxiosError } from 'axios';

import { lastValueFrom } from 'rxjs';
import { URLSearchParams } from 'url';
import { OrderDoa } from '../../db/doa/order.doa';
import { CreateOrderEntityDto } from '../../db/dto/createOrder.entity.dto';
import { ModelMapperServiceOrder } from '../../db/service/modelMapperOrder.service';
import { AxiosApplicationException } from '../../error/axios.applaction.exception';
import { UnKnowApplicationException } from '../../error/unKnow.appliaction.exception';
import { CreateOrderCommand } from './create_order.command';

@CommandHandler(CreateOrderCommand)
export class CreateOrderCommandHandler
  implements ICommandHandler<CreateOrderCommand>
{
  constructor(
    private readonly orderdoa: OrderDoa,
    private readonly http: HttpService,
    private readonly model: ModelMapperServiceOrder,
  ) {}

  async execute(command: CreateOrderCommand): Promise<any> {
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
      const result = await this.orderdoa.save(model);

      return this.model.OrderToDto(result);
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new AxiosApplicationException();
      }

      throw new UnKnowApplicationException();
    }
  }
}
