import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { of } from 'rxjs';

import { OrderDoa } from '../../db/doa/order.doa';

import { mockUpdateImgOrderCommand, mockOrder, mockOrderDto } from '../../mock';
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
import { UpdateImgOrderCommandHandler } from './update-img.order.command.handler';

describe('update imgOrderCommand', () => {
  let orderdoa: OrderDoa;
  let httpSer: HttpService;

  let updateImgOrderCom: UpdateImgOrderCommandHandler;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        { provide: OrderDoa, useFactory: createMock },
        { provide: HttpService, useFactory: createMock },

        UpdateImgOrderCommandHandler,
      ],
    }).compile();

    updateImgOrderCom = await app.get(UpdateImgOrderCommandHandler);
    orderdoa = await app.get(OrderDoa);
    httpSer = await app.resolve<HttpService>(HttpService);
  });
  it('update  orderImgCommand is done ', async () => {
    const body = mockUpdateImgOrderCommand();

    const res = mockAxiosResponse({ data: { display_url: 'lslslsl' } });
    const obs = of(res);

    jest.spyOn(orderdoa, 'update').mockResolvedValue(true);
    jest.spyOn(httpSer, 'post').mockReturnValue(obs);

    const result = await updateImgOrderCom.execute(body);

    expect(result).toBeDefined();
    expect(result).toBeTruthy();
  });

  it('update orderImgCommand  throw unknown error ', async () => {
    const res = mockAxiosResponse({ data: { display_url: 'lslslsl' } });
    const obs = of(res);

    const body = mockUpdateImgOrderCommand();
    jest.spyOn(httpSer, 'post').mockReturnValue(obs);
    jest.spyOn(orderdoa, 'update').mockRejectedValue(false);

    try {
      await updateImgOrderCom.execute(body);
    } catch (err) {
      expect(err).toBeInstanceOf(UnKnowApplicationException);
      expect((err as UnKnowApplicationException).message).toEqual(
        'Unexpected error occurred',
      );
    }
  });
});
