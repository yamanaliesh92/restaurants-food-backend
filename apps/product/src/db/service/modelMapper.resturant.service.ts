import { Injectable } from '@nestjs/common';

import { OrderEntity } from '../entity/order.entity';
import { Order } from '../model/order.model';
import { OrderDto } from '../dto/Order.dto';
import { RestaurantEntity } from '../entity/restaurant.entity';
import { Restaurant } from '../model/restuarant.model';
import { RestaurantDto } from '../dto/restaurant.dto';

@Injectable()
export class ModelMapperServiceRestaurant {
  toRestaurant(entity: RestaurantEntity): Restaurant {
    return new Restaurant({
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      name: entity.name,
      address: entity.address,
      userId: entity.userId,
    });
  }

  RestaurantToDto(data: Restaurant): RestaurantDto {
    return new RestaurantDto({
      id: data.id,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      name: data.name,
      address: data.address,
      userId: data.userId,
    });
  }
}
