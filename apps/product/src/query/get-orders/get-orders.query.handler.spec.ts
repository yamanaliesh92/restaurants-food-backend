import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { OrderDoa } from '../../db/doa/order.doa';
import { ModelMapperServiceOrder } from '../../db/service/modelMapperOrder.service';

import { mockGetAllOrder, mockGetOrderQuery, mockOrder, mockOrderDto } from '../../mock';
import { UnKnowApplicationException } from '../../error/unknown.application.exception';

import { EntityNotFoundError } from 'typeorm';

import { NotFoundApplicationException } from '../../error/record-not-found.application.exception';
import { NotFoundDataAccessException } from '../../db/error/notFoundError.access.exception';
import { GetOrdersQueryHandler } from './get-orders.query.handler';

describe('get OrderQueryHandler', () => {
  let orderdoa: OrderDoa;

  let modelMap: ModelMapperServiceOrder;
  let getOrdesQu: GetOrdersQueryHandler;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        { provide: OrderDoa, useFactory: createMock },

        { provide: ModelMapperServiceOrder, useFactory: createMock },
        GetOrdersQueryHandler,
      ],
    }).compile();

    getOrdesQu = await app.get(GetOrdersQueryHandler);
    orderdoa = await app.get(OrderDoa);
    modelMap = await app.get(ModelMapperServiceOrder);
  });

  it('get oneOrderQuery is done ', async () => {
    const orderDto = mockGetAllOrder();
    const body = mockGetOrderQuery();
    const order = mockGetAllOrder();

    jest.spyOn(orderdoa, 'findOne').mockResolvedValue(order as   );

    jest.spyOn(modelMap, 'orderToDto').mockReturnValue(orderDto);

    const result = await getOrdesQu.execute();

    expect(result).toBeDefined();
    // expect(result.).toEqual(order.id);
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
      await getOrdesQu.execute(body);
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
      await getOrdesQu.execute(body);
    } catch (err) {
      expect(err).toBeInstanceOf(UnKnowApplicationException);
      expect((err as UnKnowApplicationException).message).toEqual(
        'Unexpected error occurred',
      );
    }
  });
});
