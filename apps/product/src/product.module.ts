import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';

import { CreateRestaurantCommandHandler } from './command/create-restaurant/create-restaurant.command.handler';

import { CreateOrderCommandHandler } from './command/create-order/create_order.command.handler';
import { DeleteOrderCommandHandler } from './command/delete_order/delete_order.command.handler';
import { GetOneRestaurantQueryHandler } from './query/get-one-restaurant/get-one-restaurant.query.handler';
import { GetOrdersQueryHandler } from './query/get-orders/get-orders.query.handler';
import { GetAllOrdersByUserIdQueryHandler } from './query/get-user-orders/get-user-orders.command.handler';
import { GetOrderQueryHandler } from './query/get-order/get-order.query.handler';

import { UpdateImgOrderCommandHandler } from './command/update-imgOrder/update-img.order.command.handler';
import { UpdateOrderCommandHandler } from './command/update_order/update-order.command.handler';
import { DbProductModule } from './db/db.product.module';

import { OrdersController } from './order.controller';
import { ProductService } from './product.service';
import { ResController } from './restaurant.controller';

import { GetAllOrdersByCategoryQueryHandler } from './query/get-order-by-category/get-order-by-category.query.handler';
import { GetAllRestaurantQueryHandler } from './query/get-restaurant/get-restaurant.query.handler';
import { CreateEventCommandHandler } from './command/create-event/create-event.command.handler';
import { EventsController } from './event.controller';
import { GetAllEventQueryHandler } from './query/get-all-event/get-all-event.query.handler';
import { DeleteEventCommandHandler } from './command/delete-event/delete-event.command.handler';
import { UpdateEventCommandHandler } from './command/update-event/update.event.command.handler';
import { GetUserEVentsQueryHandler } from './query/get-user-events/get-user-events.query.handler';
import { UpdateRestaurantInfoCommandHandler } from './command/update-restaurant/update.restaurant.info.command.handler';
import { GetOneEventQueryHandler } from './query/get-one-event/get-one.event.query.handler';
import { Jwt } from 'y/lib/shared/jwt.service';

@Module({
  imports: [DbProductModule, HttpModule, CqrsModule, ConfigModule.forRoot()],
  controllers: [OrdersController, ResController, EventsController],
  providers: [
    ProductService,
    CreateOrderCommandHandler,
    GetOneRestaurantQueryHandler,
    GetUserEVentsQueryHandler,
    GetOrderQueryHandler,
    CreateEventCommandHandler,
    UpdateOrderCommandHandler,
    UpdateRestaurantInfoCommandHandler,
    CreateRestaurantCommandHandler,
    GetOneEventQueryHandler,
    DeleteEventCommandHandler,
    UpdateImgOrderCommandHandler,
    UpdateEventCommandHandler,
    GetAllRestaurantQueryHandler,
    GetAllEventQueryHandler,
    GetAllOrdersByCategoryQueryHandler,
    JwtService,
    Jwt,
    GetAllOrdersByUserIdQueryHandler,
    GetOrdersQueryHandler,
    DeleteOrderCommandHandler,
  ],
})
export class ProductModule {}
