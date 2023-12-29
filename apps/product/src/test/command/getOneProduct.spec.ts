import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductCommand } from '../../command/create_order/create_order.command';

import { ProductDoa } from '../../db/doa/order.doa';
import { Product } from '../../db/entity/order.entity';
import { ProductDoaMock } from '../../mock/product.doa.mock';
import { expect } from '@jest/globals';
import { GetOneProductCommandHandler } from '../../command/get_one_order/get_one_order.command.handler';
import { GetOneProductCommand } from '../../command/get_one_order/get_one_order.command';

describe('test createProduct', () => {
  let productDoa: ProductDoa;
  let getOneProduct: GetOneProductCommandHandler;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: ProductDoa, useClass: ProductDoaMock },
        GetOneProductCommandHandler,
      ],
    }).compile();

    productDoa = await app.resolve<ProductDoa>(ProductDoa);

    getOneProduct = await app.resolve<GetOneProductCommandHandler>(
      GetOneProductCommandHandler,
    );
  });

  describe('te', () => {
    it('test', async () => {
      const mock = Product.mockProduct();
      const id = GetOneProductCommand.mockGetOneProductCommand();

      const model = jest.spyOn(productDoa, 'findOne').mockResolvedValue(mock);
      const result = await getOneProduct.execute(id);
      expect(result).toBeDefined();
      expect(model).toBeCalled();
      expect(result).toEqual(mock);
    });
  });
});
