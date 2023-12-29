import { Injectable } from '@nestjs/common';

import { OrderEntity } from '../entity/order.entity';
import { Order } from '../model/order.model';
import { OrderDto } from '../dto/Order.dto';
import { Event } from '../model/event.model';
import { EventEntity } from '../entity/event.entity';
import { EventDto } from '../dto/event.dto';

@Injectable()
export class ModelMapperServiceEvent {
  toEvent(entity: EventEntity): Event {
    return new Event({
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      name: entity.name,
      imgOrder: entity.imgOrder,
      description: entity.description,
      category: entity.category,
      userId: entity.userId,
      restaurantId: entity.restaurantId,
      newPrice: entity.newPrice,
      oldPrice: entity.oldPrice,
      date: entity.date,
    });
  }

  EventToDto(data: Event): EventDto {
    return new EventDto({
      id: data.id,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      name: data.name,
      date: data.date,
      description: data.description,
      imgOrder: data.imgOrder,
      category: data.category,
      userId: data.userId,
      restaurantId: data.restaurantId,
      newPrice: data.newPrice,
      oldPrice: data.oldPrice,
    });
  }
}
