import { CommandBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserCommand } from '../command/create_User/create_User.command';
import { User } from '../db/entity/user.entity';
import { CommandBusMock } from '../mock/commandMock/createUser.mock';
import { UserController } from '../user.controller';

describe('create contoller', () => {
  let commandbus: CommandBus;
  let userContoller: UserController;

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

    userContoller = await app.resolve<UserController>(UserController);
    commandbus = await app.resolve<CommandBus>(CommandBus);
  });

  describe('test', () => {
    it('test is done', async () => {
      const body = CreateUserCommand.mockCreateUserCommand();
      const users = User.mockUser();
      const token = 'dddddddd';
      const model = { user: users, token };
      jest.spyOn(commandbus, 'execute').mockResolvedValue(body);
      const result = await userContoller.createUser(body);
      // expect(result).toBeDefined();
    });
  });
});
