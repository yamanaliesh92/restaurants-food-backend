import { GetAllProductCommandHandler } from '../../query/get-user-orders/get-user-orders.command.handler';
import { Test, TestingModule } from '@nestjs/testing';

import { ProductDoa } from '../../db/doa/order.doa';

import { ProductDoaMock } from '../../mock/product.doa.mock';
import { expect } from '@jest/globals';

import { GetAllProductCommand } from '../../query/get-user-orders/getAllOrdersByUserId.command';

describe('test createProduct', () => {
  let productDoa: ProductDoa;
  let getAllProductByUserID: GetAllProductCommandHandler;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: ProductDoa, useClass: ProductDoaMock },
        GetAllProductCommandHandler,
      ],
    }).compile();

    productDoa = await app.resolve<ProductDoa>(ProductDoa);

    getAllProductByUserID = await app.resolve<GetAllProductCommandHandler>(
      GetAllProductCommandHandler,
    );
  });

  describe('te', () => {
    it('test', async () => {
      const mock = [
        {
          id: 7,
          createAt: new Date(),
          updateAt: new Date(),
          name: 'good',
          userId: 9,
          imgProduct: null,
          price: 11,
        },
        {
          id: 9,
          createAt: new Date(),
          updateAt: new Date(),
          name: 'testtt',
          userId: 61,
          imgProduct: 'https://i.ibb.co/XVNF0Zz/7ccdf3c7f37b.png',
          price: 212331,
        },
      ];
      const userId = GetAllProductCommand.mockGetAllProductCommand();

      const model = jest.spyOn(productDoa, 'find').mockResolvedValue(mock);

      const result = await getAllProductByUserID.execute(userId);

      expect(result).toBeDefined();
      expect(model).toBeCalled();
      expect(result[0].price).toEqual(11);
      expect(result[0].name).toEqual('good');
    });
  });
});
