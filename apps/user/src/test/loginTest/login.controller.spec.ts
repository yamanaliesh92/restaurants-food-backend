import { CommandBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { LoginCommand } from '../../command/login/login.coomand';
import { CommandBusMock } from '../../mock/commandMock/createUser.mock';
import { UserController } from '../../user.controller';
import { expect } from '@jest/globals';
import { Logger } from '@nestjs/common';

describe('test login Controller', () => {
  let command: CommandBus;
  let userContorller: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CommandBus,
          useClass: CommandBusMock,
        },
      ],
      controllers: [UserController],
    }).compile();

    userContorller = await app.resolve<UserController>(UserController);
    command = await app.resolve<CommandBus>(CommandBus);
  });

  describe('test controller', () => {
    it('test is done', async () => {
      const bodyMock = LoginCommand.mockLoginCommand();
      jest.spyOn(command, 'execute').mockResolvedValue(bodyMock);
      const result = await userContorller.login(bodyMock);
      console.log('result', { result });
      expect(result).toBeDefined();
      expect(result).toEqual({ email: 'ali@gamil.com', password: 'ali1212' });
    });
  });
});
