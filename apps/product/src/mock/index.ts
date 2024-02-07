import { faker } from '@faker-js/faker';
import { Order } from '../db/model/order.model';
import { OrderDto } from '../db/dto/Order.dto';
import { UpdateOrderCommand } from '../command/update_order/update-order.command';
import { GetOrderQuery } from '../query/get-order/get-order.query';
import { CreateOrderCommand } from '../command/create-order/create_order.command';
import { DeleteOrderCommand } from '../command/delete_order/delete_order.command';
import { UpdateImgOrderCommand } from '../command/update-imgOrder/update.imgOrder.command';
import { CreateEventCommand } from '../command/create-event/create-event.commadn';
import { CreateRestaurantCommand } from '../command/create-restaurant/create-restaurant.command';
import { EventDto } from '../db/dto/event.dto';
import { Event } from '../db/model/event.model';
import { Restaurant } from '../db/model/restaurant.model';
import { UpdateEventCommand } from '../command/update-event/update.event.command';
import { UpdateRestaurantInfoCommand } from '../command/update-restaurant/update.restaurant.info.command';
import { DeleteEventCommand } from '../command/delete-event/delete-event.command';
import { UpdateImgEventCommand } from '../command/update-img-event/update.img.event.command';
import { RestaurantDto } from '../db/dto/restaurant.dto';
import { GetOneRestaurantQuery } from '../query/get-one-restaurant/get-one-restaurant.query';
import { GetOneEventQuery } from '../query/get-one-event/get-one.event.query';

export const mockCreateOrderCommand = () => {
  return new CreateOrderCommand({
    name: 'testOrder',
    price: 12,
    category: 'testCategory',
    description: 'testDescription',
    restaurantId: 11,
    userId: 19,
    imgOrder: 's',
  });
};

export const mockCreateEventCommand = () => {
  return new CreateEventCommand({
    name: 'testEvent',
    oldPrice: 12,
    newPrice: 10,
    category: 'testCategory',
    description: 'testDescription',
    restaurantId: 11,
    userId: 19,
    date: 'date',
    imgOrder: 's',
  });
};

export const mockCreateRestaurantCommand = () => {
  return new CreateRestaurantCommand({
    name: 'testEvent',
    address: 'testAddress',
    userId: 19,
  });
};

export const mockGetOrderQuery = () => {
  return new GetOrderQuery({
    id: 12,
  });
};

export const mockGetOneEventQuery = () => {
  return new GetOneEventQuery({
    id: 12,
  });
};

export const mockDeleteOrderCommand = () => {
  return new DeleteOrderCommand({
    id: 12,
  });
};

export const mockDeleteEventCommand = () => {
  return new DeleteEventCommand({
    id: 12,
  });
};

export const mockUpdateImgOrderCommand = () => {
  return new UpdateImgOrderCommand({
    id: 12,
    imgOrder: 'updateImg',
  });
};

export const mockGetRestaurantCommand = () => {
  return new GetOneRestaurantQuery({
    id: 12,
  });
};

export const mockUpdateImgEventCommand = () => {
  return new UpdateImgEventCommand({
    id: 12,
    imgOrder: 'updateImg',
  });
};

export const mockCreateUserResponse = () => {
  return {
    accessTok: 'acessTokenAccessTokem',
    refreshToken: 'refreshTokenRefreshToken',
  };
};

export const mockUpdateOrderCommand = () => {
  return new UpdateOrderCommand({
    name: 'update',
    id: 124,
    price: 12,
    category: 'updateTestCategory',
    description: 'updateTestDescription',
  });
};

export const mockUpdateEventCommand = () => {
  return new UpdateEventCommand({
    name: 'update',
    id: 124,
    newPrice: 12,
    oldPrice: 14,
    date: faker.date.future(),
    category: 'updateTestCategory',
    description: 'updateTestDescription',
  });
};

export const mockUpdateRestaurantCommand = () => {
  return new UpdateRestaurantInfoCommand({
    name: 'update',
    id: 124,
    address: 'updateAddress',
  });
};

export function mockOrderDto() {
  return new OrderDto({
    name: 'testOrder',
    price: 12,
    category: 'testCategory',
    description: 'testDescription',
    restaurantId: 11,
    userId: 19,
    imgOrder: '',

    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    id: 12,
  });
}

export function mockEventDto() {
  return new EventDto({
    name: 'testOrder',
    oldPrice: 14,
    date: faker.date.future(),
    newPrice: 12,
    category: 'testCategory',
    description: 'testDescription',
    restaurantId: 11,
    userId: 19,
    imgOrder: '',

    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    id: 12,
  });
}

export function mockGetAllOrder() {
  return [
    {
      name: 'testOrder',
      price: 12,
      category: 'testCategory',
      description: 'testDescription',
      restaurantId: 11,
      userId: 19,
      imgOrder: '',

      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      id: 12,
    },
    {
      name: 'testTwoOrder',
      price: 10,
      category: 'testTwoCategory',
      description: 'testTwoDescription',
      restaurantId: 12,
      userId: 1,
      imgOrder: 'two',

      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      id: 11,
    },
  ];
}

export function mockOrder() {
  return new Order({
    name: 'testOrder',
    price: 12,
    category: 'testCategory',
    description: 'testDescription',
    restaurantId: 11,
    userId: 19,
    imgOrder: 's',

    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    id: 12,
  });
}

export function mockEvent() {
  return new Event({
    name: 'testOrder',
    newPrice: 12,
    oldPrice: 14,
    date: faker.date.future(),
    category: 'testCategory',
    description: 'testDescription',
    restaurantId: 11,
    userId: 19,
    imgOrder: 's',

    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    id: 12,
  });
}
export function mockRestaurantDto() {
  return new RestaurantDto({
    name: 'testOrder',
    address: 'address',

    userId: 19,

    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    id: 12,
  });
}

export function mockRestaurant() {
  return new Restaurant({
    name: 'testOrder',
    address: 'address',

    userId: 19,

    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    id: 12,
  });
}
