import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductCommand } from '../../command/create-order/create_order.command';
import { CreateProductCommandHandler } from '../../command/create-order/create_order.command.handler';
import { ProductDoa } from '../../db/doa/order.doa';
import { Product } from '../../db/entity/order.entity';
import { ProductDoaMock } from '../../mock/product.doa.mock';
import { expect } from '@jest/globals';

describe('test createProduct', () => {
  let productDoa: ProductDoa;
  let createProd: CreateProductCommandHandler;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: ProductDoa, useClass: ProductDoaMock },
        CreateProductCommandHandler,
      ],
    }).compile();

    productDoa = await app.resolve<ProductDoa>(ProductDoa);

    createProd = await app.resolve<CreateProductCommandHandler>(
      CreateProductCommandHandler,
    );
  });

  describe('te', () => {
    it('test', async () => {
      const mock = Product.mockProduct();
      const body = CreateProductCommand.mockCreateProductCommand();

      const model = jest.spyOn(productDoa, 'save').mockResolvedValue(mock);
      const result = await createProd.execute(body);
      expect(result).toBeDefined();
      expect(model).toBeCalled();
      expect(result).toEqual(mock);
    });
  });
});
