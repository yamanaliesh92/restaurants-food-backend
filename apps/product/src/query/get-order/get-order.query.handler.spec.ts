import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { OrderDoa } from '../../db/doa/order.doa';
import { ModelMapperServiceOrder } from '../../db/service/modelMapperOrder.service';

import { mockGetOrderQuery, mockOrder, mockOrderDto } from '../../mock';
import { UnKnowApplicationException } from '../../error/unknown.application.exception';

import { EntityNotFoundError } from 'typeorm';

import { GetOrderQueryHandler } from './get-order.query.handler';
import { NotFoundApplicationException } from '../../error/record-not-found.application.exception';
import { NotFoundDataAccessException } from '../../db/error/notFoundError.access.exception';

describe('get OrderQueryHandler', () => {
  let orderdoa: OrderDoa;

  let modelMap: ModelMapperServiceOrder;
  let getOrdeQe: GetOrderQueryHandler;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        { provide: OrderDoa, useFactory: createMock },

        { provide: ModelMapperServiceOrder, useFactory: createMock },
        GetOrderQueryHandler,
      ],
    }).compile();

    getOrdeQe = await app.get(GetOrderQueryHandler);
    orderdoa = await app.get(OrderDoa);
    modelMap = await app.get(ModelMapperServiceOrder);
  });

  it('get oneOrderQuery is done ', async () => {
    const orderDto = mockOrderDto();
    const body = mockGetOrderQuery();
    const order = mockOrder();

    jest.spyOn(orderdoa, 'findOne').mockResolvedValue(order);

    jest.spyOn(modelMap, 'orderToDto').mockReturnValue(orderDto);

    const result = await getOrdeQe.execute(body);

    expect(result).toBeDefined();
    expect(result.id).toEqual(order.id);
  });

  it('get order query   throw order is not found ', async () => {
    const err0r = new NotFoundDataAccessException(
      new EntityNotFoundError('', []),
    );

    const orderDto = mockOrderDto();
    const body = mockGetOrderQuery();

    jest.spyOn(orderdoa, 'findOne').mockRejectedValue(err0r);

    jest.spyOn(modelMap, 'orderToDto').mockReturnValue(orderDto);

    try {
      await getOrdeQe.execute(body);
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
    const body = mockGetOrderQuery();

    jest.spyOn(orderdoa, 'findOne').mockRejectedValue(err0r);

    jest.spyOn(modelMap, 'orderToDto').mockReturnValue(orderDto);

    try {
      await getOrdeQe.execute(body);
    } catch (err) {
      expect(err).toBeInstanceOf(UnKnowApplicationException);
      expect((err as UnKnowApplicationException).message).toEqual(
        'Unexpected error occurred',
      );
    }
  });
});
