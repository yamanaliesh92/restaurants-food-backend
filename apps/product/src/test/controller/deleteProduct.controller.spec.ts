import { CommandBus } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { DeleteProductCommand } from '../../command/delete_order/delete_order.command';
import { ClientKafKaMock } from '../../mock/cleintkafka.mock';
import { CommandBusMocks } from '../../mock/commandBus.mock';
import { ProductController } from '../../order.controller';
import { expect } from '@jest/globals';

describe('test', () => {
  let commandbus: CommandBus;
  let productContr: ProductController;
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

    productContr = await app.resolve<ProductController>(ProductController);
    commandbus = await app.resolve<CommandBus>(CommandBus);
    clinet = await app.resolve<ClientKafka>('AUTH_MICROSERVICE');
  });

  describe('test delete', () => {
    it('ttttttt', async () => {
      const id = DeleteProductCommand.mockDeleteProductCommand();
      const ids = 1;
      jest.spyOn(commandbus, 'execute').mockResolvedValue(id);
      const result = await productContr.delete(ids);
      console.log('ress', result);
      expect(result).toBeTruthy();
    });
  });
});
