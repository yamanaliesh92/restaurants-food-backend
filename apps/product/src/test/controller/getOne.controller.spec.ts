import { CommandBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductCommand } from '../../command/create-order/create_order.command';
import { Product } from '../../db/entity/order.entity';
import { CommandBusMocks } from '../../mock/commandBus.mock';
import { expect } from '@jest/globals';
import { ProductController } from '../../order.controller';

import { ClientKafka } from '@nestjs/microservices';
import { ClientKafKaMock } from '../../mock/cleintkafka.mock';

describe('test controller', () => {
  let commandbus: CommandBus;
  let productController: ProductController;
  let clinet: ClientKafka;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CommandBus,
          useClass: CommandBusMocks,
        },
        {
          provide: 'AUTH_MICROSERVICE',
          useClass: ClientKafKaMock,
        },
      ],
      controllers: [ProductController],
    }).compile();

    productController = await app.resolve<ProductController>(ProductController);
    commandbus = await app.resolve<CommandBus>(CommandBus);
    clinet = await app.resolve<ClientKafka>('AUTH_MICROSERVICE');
  });

  describe('test getProductController', () => {
    it('test', async () => {
      const product = Product.mockProduct();
      const id = product.id;
      // const body = CreateProductCommand.mockCreateProductCommand();
      // const userId = body.userId;
      jest.spyOn(commandbus, 'execute').mockResolvedValue(product);

      const result = await productController.getOne(id);
      console.log('rr', { result });
      expect(result).toBeDefined();
      expect(result).toEqual(product);
    });
  });
});
