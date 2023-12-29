import { CommandBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductCommand } from '../../command/create_order/create_order.command';
import { Product } from '../../db/entity/order.entity';
import { CommandBusMocks } from '../../mock/commandBus.mock';
import { expect } from '@jest/globals';
import { ProductController } from '../../order.controller';

import { ClientKafka } from '@nestjs/microservices';
import { ClientKafKaMock } from '../../mock/cleintkafka.mock';
import { of } from 'rxjs';

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

  describe('test createProductController', () => {
    it('test', async () => {
      const product = Product.mockProduct();
      const body = CreateProductCommand.mockCreateProductCommand();
      const userId = body.userId;
      jest.spyOn(commandbus, 'execute').mockResolvedValue(body);
      jest.spyOn(clinet, 'send').mockReturnValue(of({ userId: 2 }));

      const result = await productController.createProduct(body);
      expect(result).toBeDefined();
    });
  });
});
