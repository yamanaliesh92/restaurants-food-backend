import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';

import { OrderDoa } from '../../db/doa/order.doa';

import { UnKnowApplicationException } from '../../error/unknown.application.exception';

import { mockDeleteOrderCommand, mockUpdateOrderCommand } from '../../mock';
import { UpdateOrderCommandHandler } from './update-order.command.handler';

describe('update orderCommandHandler', () => {
  let orderdoa: OrderDoa;

  let updateOrderCom: UpdateOrderCommandHandler;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        { provide: OrderDoa, useFactory: createMock },
        UpdateOrderCommandHandler,
      ],
    }).compile();

    updateOrderCom = await app.get(UpdateOrderCommandHandler);
    orderdoa = await app.get(OrderDoa);
  });
  it('update   orderCommand is done ', async () => {
    const body = mockUpdateOrderCommand();

    jest.spyOn(orderdoa, 'update').mockResolvedValue(true);

    const result = await updateOrderCom.execute(body);

    expect(result).toBeDefined();
    expect(result).toBeTruthy();
  });

  it('update orderCommand  throw unknown error ', async () => {
    jest.spyOn(orderdoa, 'update').mockRejectedValue(false);
    const body = mockDeleteOrderCommand();

    try {
      await updateOrderCom.execute(body);
    } catch (err) {
      expect(err).toBeInstanceOf(UnKnowApplicationException);
      expect((err as UnKnowApplicationException).message).toEqual(
        'Unexpected error occurred',
      );
    }
  });
});
