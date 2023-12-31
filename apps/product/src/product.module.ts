import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { CreateRestaurantCommandHandler } from './command/create-resturant/creater-resturarant.command.handler';

import { CreateOrderCommandHandler } from './command/create_order/create_order.command.handler';
import { DeleteOrderCommandHandler } from './command/delete_order/delete_order.command.handler';
import { GetOneRestaurantCommandHandler } from './command/get-one-restaurant/get-one-restaurant.command.handler';
import { GetAllOrderCommandHandler } from './command/get_AllOrders/get_AllOrder.command.handler';
import { GetAllOrdersByUserIdCommandHandler } from './command/get_allOrderByUserId/getAllOrdersByUserId.command.handler';
import { GetOneOrderCommandHandler } from './command/get_one_order/get_one_order.command.handler';

import { UpdateImgOrderCommandHandler } from './command/update-imgProduct/update-img.order.command.handler';
import { UpdateOrderCommandHandler } from './command/update_order/update_order.command.handler';
import { DbProductModule } from './db/db.product.module';

import { OrdersController } from './order.controller';
import { ProductService } from './product.service';
import { ResController } from './restaurant.controller';
import { Jwt } from './shared/jwt.service';
import { GetAllOrdersByCategoryCommandHandler } from './command/get-allOrderByCategory/get-allOrderByCategory.command.handler';
import { GetAllRestaurantCommandHandler } from './command/get-allResturant/get-allResturant.comman.handler';
import { CreateEventCommandHandler } from './command/create-event/create-event.command.handler';
import { EventsController } from './event.controller';
import { GetAllEventCommandHandler } from './command/get-all-event/get-all-event.command.handler';
import { DeleteEventCommandHandler } from './command/delete-event/delete-event.command.handler';
import { UpdateEventCommandHandler } from './command/update-event/update.event.command.handler';
import { GetAllEventsByUserIdCommandHandler } from './command/get-my-all-event/get.my.all.event.command.handler';
import { UpdateRestaurantInfoCommandHandler } from './command/update-resturant/update.resturant.info.command.handler';
import { GetOneEventCommandHandler } from './command/get-one-event/get-one.event.command.handler';

@Module({
  imports: [DbProductModule, HttpModule, CqrsModule],
  controllers: [OrdersController, ResController, EventsController],
  providers: [
    ProductService,
    CreateOrderCommandHandler,
    GetOneRestaurantCommandHandler,
    GetAllEventsByUserIdCommandHandler,
    GetOneOrderCommandHandler,
    CreateEventCommandHandler,
    UpdateOrderCommandHandler,
    UpdateRestaurantInfoCommandHandler,
    CreateRestaurantCommandHandler,
    GetOneEventCommandHandler,
    DeleteEventCommandHandler,
    UpdateImgOrderCommandHandler,
    UpdateEventCommandHandler,
    GetAllRestaurantCommandHandler,
    GetAllEventCommandHandler,
    GetAllOrdersByCategoryCommandHandler,
    Jwt,
    GetAllOrdersByUserIdCommandHandler,
    GetAllOrderCommandHandler,
    DeleteOrderCommandHandler,
  ],
})
export class ProductModule {}
