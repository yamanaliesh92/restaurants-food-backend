import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';

import { OrderDoa } from '../../db/doa/order.doa';

import { UnKnowApplicationException } from '../../error/unknown.application.exception';
import { DeleteOrderCommandHandler } from './delete_order.command.handler';
import { mockDeleteOrderCommand, mockOrder } from '../../mock';

describe('delete orderCommandHandler', () => {
  let orderdoa: OrderDoa;

  let deleteOrderComm: DeleteOrderCommandHandler;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        { provide: OrderDoa, useFactory: createMock },
        DeleteOrderCommandHandler,
      ],
    }).compile();

    deleteOrderComm = await app.get(DeleteOrderCommandHandler);
    orderdoa = await app.get(OrderDoa);
  });
  it('delete   orderCommand is done ', async () => {
    const id = mockDeleteOrderCommand();

    jest.spyOn(orderdoa, 'delete').mockResolvedValue(true);

    const result = await deleteOrderComm.execute(id);

    expect(result).toBeDefined();
    expect(result).toBeTruthy();
  });

  it('delete orderCommand  throw unknown error ', async () => {
    jest.spyOn(orderdoa, 'delete').mockRejectedValue(false);
    const id = mockDeleteOrderCommand();

    try {
      await deleteOrderComm.execute(id);
    } catch (err) {
      expect(err).toBeInstanceOf(UnKnowApplicationException);
      expect((err as UnKnowApplicationException).message).toEqual(
        'Unexpected error occurred',
      );
    }
  });
});
