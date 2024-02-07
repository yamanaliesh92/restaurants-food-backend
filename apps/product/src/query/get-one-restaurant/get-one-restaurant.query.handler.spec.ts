import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';

import {
  mockGetRestaurantCommand,
  mockRestaurant,
  mockOrderDto,
} from '../../mock';
import { UnKnowApplicationException } from '../../error/unknown.application.exception';

import { EntityNotFoundError } from 'typeorm';

import { NotFoundApplicationException } from '../../error/record-not-found.application.exception';
import { NotFoundDataAccessException } from '../../db/error/notFoundError.access.exception';
import { RestaurantDoa } from '../../db/doa/restaurant.doa';
import { ModelMapperServiceRestaurant } from '../../db/service/modelMapper.restaurant.service';
import { GetOneRestaurantQueryHandler } from './get-one-restaurant.query.handler';

describe('get OrderQueryHandler', () => {
  let resdoa: RestaurantDoa;

  let modelMap: ModelMapperServiceRestaurant;
  let getResQe: GetOneRestaurantQueryHandler;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        { provide: RestaurantDoa, useFactory: createMock },

        { provide: ModelMapperServiceRestaurant, useFactory: createMock },
        GetOneRestaurantQueryHandler,
      ],
    }).compile();

    getResQe = await app.get(GetOneRestaurantQueryHandler);
    resdoa = await app.get(RestaurantDoa);
    modelMap = await app.get(ModelMapperServiceRestaurant);
  });

  it('get oneOrderQuery is done ', async () => {
    const orderDto = mockOrderDto();
    const body = mockGetRestaurantCommand();
    const order = mockRestaurant();

    jest.spyOn(resdoa, 'findOne').mockResolvedValue(order);

    jest.spyOn(modelMap, 'restaurantToDto').mockReturnValue(orderDto);

    const result = await getResQe.execute(body);

    expect(result).toBeDefined();
    expect(result.id).toEqual(order.id);
  });

  it('get order query   throw order is not found ', async () => {
    const err0r = new NotFoundDataAccessException(
      new EntityNotFoundError('', []),
    );

    const orderDto = mockOrderDto();
    const body = mockGetRestaurantCommand();

    jest.spyOn(resdoa, 'findOne').mockRejectedValue(err0r);

    jest.spyOn(modelMap, 'orderToDto').mockReturnValue(orderDto);

    try {
      await getResQe.execute(body);
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundApplicationException);
      expect((err as NotFoundApplicationException).message).toEqual(
        'the record we are looking for was not found',
      );
    }
  });

  it('get order query   throw unknown error ', async () => {
    const err0r = 'unKnow Error';

    const orderDto = mockOrderDto();
    const body = mockGetRestaurantCommand();

    jest.spyOn(resdoa, 'findOne').mockRejectedValue(err0r);

    jest.spyOn(modelMap, 'restaurantToDto').mockReturnValue(orderDto);

    try {
      await getResQe.execute(body);
    } catch (err) {
      expect(err).toBeInstanceOf(UnKnowApplicationException);
      expect((err as UnKnowApplicationException).message).toEqual(
        'Unexpected error occurred',
      );
    }
  });
});
