import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { of } from 'rxjs';

import { OrderDoa } from '../../db/doa/order.doa';
import { ModelMapperServiceOrder } from '../../db/service/modelMapperOrder.service';
import { CreateOrderCommandHandler } from './create_order.command.handler';
import { mockCreateOrderCommand, mockOrder, mockOrderDto } from '../../mock';
import { UnKnowApplicationException } from '../../error/unknown.application.exception';

export const mockAxiosResponse = (data: any): AxiosResponse => ({
  data,
  status: 200,
  statusText: '200',
  config: {} as any,
  headers: {},
});
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

describe('create Order', () => {
  let orderdoa: OrderDoa;
  let httpSer: HttpService;

  let modelMap: ModelMapperServiceOrder;
  let createOrderComm: CreateOrderCommandHandler;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        { provide: OrderDoa, useFactory: createMock },
        { provide: HttpService, useFactory: createMock },
        { provide: ModelMapperServiceOrder, useFactory: createMock },
        CreateOrderCommandHandler,
      ],
    }).compile();

    createOrderComm = await app.get(CreateOrderCommandHandler);
    orderdoa = await app.get(OrderDoa);
    httpSer = await app.resolve<HttpService>(HttpService);
    modelMap = await app.get(ModelMapperServiceOrder);
  });
  it('create  orderCommand is done ', async () => {
    const orderDto = mockOrderDto();
    const body = mockCreateOrderCommand();
    const order = mockOrder();
    const res = mockAxiosResponse({ data: { display_url: 'lslslsl' } });
    const obs = of(res);

    jest.spyOn(orderdoa, 'save').mockResolvedValue(order);
    jest.spyOn(httpSer, 'post').mockReturnValue(obs);
    jest.spyOn(modelMap, 'orderToDto').mockReturnValue(orderDto);

    const result = await createOrderComm.execute(body);

    expect(result).toBeDefined();
    expect(result.id).toEqual(order.id);
    expect(result.price).toEqual(order.price);
  });

  it('create orderCommand  throw unknown error ', async () => {
    const res = mockAxiosResponse({ data: { display_url: 'lslslsl' } });
    const obs = of(res);
    const err0r = 'unKnow Error';

    const orderDto = mockOrderDto();
    const body = mockCreateOrderCommand();
    jest.spyOn(httpSer, 'post').mockReturnValue(obs);
    jest.spyOn(orderdoa, 'save').mockRejectedValue(err0r);

    jest.spyOn(modelMap, 'orderToDto').mockReturnValue(orderDto);

    try {
      await createOrderComm.execute(body);
    } catch (err) {
      expect(err).toBeInstanceOf(UnKnowApplicationException);
      expect((err as UnKnowApplicationException).message).toEqual(
        'Unexpected error occurred',
      );
    }
  });
});
