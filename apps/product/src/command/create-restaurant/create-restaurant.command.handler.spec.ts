import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';

import {
  mockCreateRestaurantCommand,
  mockRestaurant,
  mockRestaurantDto,
} from '../../mock';
import { UnKnowApplicationException } from '../../error/unknown.application.exception';
import { RestaurantDoa } from '../../db/doa/restaurant.doa';
import { ModelMapperServiceRestaurant } from '../../db/service/modelMapper.restaurant.service';
import { CreateRestaurantCommandHandler } from './create-restaurant.command.handler';

describe('create Order', () => {
  let resDoa: RestaurantDoa;

  let modelMap: ModelMapperServiceRestaurant;
  let createResComm: CreateRestaurantCommandHandler;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        { provide: RestaurantDoa, useFactory: createMock },

        { provide: ModelMapperServiceRestaurant, useFactory: createMock },
        CreateRestaurantCommandHandler,
      ],
    }).compile();

    createResComm = await app.get(CreateRestaurantCommandHandler);
    resDoa = await app.get(RestaurantDoa);

    modelMap = await app.get(ModelMapperServiceRestaurant);
  });
  it('create  ResCommand is done ', async () => {
    const resDto = mockRestaurantDto();
    const body = mockCreateRestaurantCommand();
    const resturant = mockRestaurant();
    jest.spyOn(resDoa, 'save').mockResolvedValue(resturant);

    jest.spyOn(modelMap, 'restaurantToDto').mockReturnValue(resDto);

    const result = await createResComm.execute(body);

    expect(result).toBeDefined();
    expect(result.id).toEqual(resturant.id);
    expect(result.address).toEqual(resturant.address);
  });

  it('create ResCommand  throw unknown error ', async () => {
    const err0r = 'unKnow Error';

    const resDto = mockRestaurantDto();
    const body = mockCreateRestaurantCommand();

    jest.spyOn(resDoa, 'save').mockRejectedValue(err0r);

    jest.spyOn(modelMap, 'restaurantToDto').mockReturnValue(resDto);

    try {
      await createResComm.execute(body);
    } catch (err) {
      expect(err).toBeInstanceOf(UnKnowApplicationException);
      expect((err as UnKnowApplicationException).message).toEqual(
        'Unexpected error occurred',
      );
    }
  });
});
