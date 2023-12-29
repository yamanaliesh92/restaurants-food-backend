import { Test, TestingModule } from '@nestjs/testing';
import { DeleteResult } from 'typeorm';
import { DeleteProductCommand } from '../../command/delete_order/delete_order.command';
import { DeleteProductCommandHandler } from '../../command/delete_order/delete_order.command.handler';
import { ProductDoa } from '../../db/doa/order.doa';
import { ProductDoaMock } from '../../mock/product.doa.mock';
import { expect } from '@jest/globals';
import { Logger } from '@nestjs/common';

describe('test delete', () => {
  let deleteCommandHand: DeleteProductCommandHandler;
  let prodoa: ProductDoa;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: ProductDoa, useClass: ProductDoaMock },
        DeleteProductCommandHandler,
      ],
    }).compile();
    prodoa = await app.resolve<ProductDoa>(ProductDoa);
    deleteCommandHand = await app.resolve<DeleteProductCommandHandler>(
      DeleteProductCommandHandler,
    );
  });

  describe('test delete', () => {
    it('deleteProduct', async () => {
      const id = DeleteProductCommand.mockDeleteProductCommand();
      const remove = jest
        .spyOn(prodoa, 'delete')
        .mockResolvedValue({} as DeleteResult);
      const result = await deleteCommandHand.execute(id);

      expect(remove).toBeCalled();

      Logger.log('del', { result });

      expect(result).toBeDefined();
    });
  });
});
