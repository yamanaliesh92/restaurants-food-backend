import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderDoa } from './doa/order.doa';
import { OrderEntity } from './entity/order.entity';
import { RestaurantDoa } from './doa/restaurant.doa';
import { RestaurantEntity } from './entity/restaurant.entity';
import { ModelMapperServiceRestaurant } from './service/modelMapper.resturant.service';
import { ModelMapperServiceOrder } from './service/modelMapperOrder.service';
import { EventDoa } from './doa/event.doa';
import { ModelMapperServiceEvent } from './service/modelMapperEvent.service';
import { EventEntity } from './entity/event.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, EventEntity, RestaurantEntity]),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'product_db',
      port: 5432,
      username: 'economicProduct_username',
      password: 'economicProduct_password',
      database: 'economicProduct_database',
      entities: [OrderEntity, RestaurantEntity, EventEntity],
      synchronize: true,
    }),
  ],
  providers: [
    OrderDoa,
    RestaurantDoa,
    EventDoa,
    ModelMapperServiceEvent,
    ModelMapperServiceRestaurant,
    ModelMapperServiceOrder,
  ],
  controllers: [],
  exports: [
    OrderDoa,
    RestaurantDoa,
    EventDoa,
    ModelMapperServiceEvent,
    ModelMapperServiceRestaurant,
    ModelMapperServiceOrder,
  ],
})
export class DbProductModule {}
