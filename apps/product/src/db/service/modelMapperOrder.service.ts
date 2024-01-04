import { Injectable } from '@nestjs/common';

import { OrderEntity } from '../entity/order.entity';
import { Order } from '../model/order.model';
import { OrderDto } from '../dto/Order.dto';

@Injectable()
export class ModelMapperServiceOrder {
  toOrder(entity: OrderEntity): Order {
    return new Order({
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      name: entity.name,
      imgOrder: entity.imgOrder,
      description: entity.description,
      category: entity.category,
      userId: entity.userId,
      restaurantId: entity.restaurantId,
      price: entity.price,
    });
  }

  orderToDto(data: Order): OrderDto {
    return new OrderDto({
      id: data.id,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      name: data.name,
      description: data.description,
      imgOrder: data.imgOrder,
      category: data.category,
      userId: data.userId,
      restaurantId: data.restaurantId,
      price: data.price,
    });
  }
}
