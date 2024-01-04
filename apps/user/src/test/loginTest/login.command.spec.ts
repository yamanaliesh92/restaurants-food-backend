import { Test, TestingModule } from '@nestjs/testing';
import { LoginCommandHandler } from '../../command/login/login.command.handler';
import { LoginCommand } from '../../command/login/login.command';
import { UserDoa } from '../../db/doa/user.doa';
import { User } from '../../db/entity/user.entity';
import { BcMock } from '../../mock/bc.mock';
import { JwtServiceMock } from '../../mock/jwt.mock';
import { UserDoaMock } from '../../mock/user.doa';
import { Bc } from '../../shared/bc.service';
import { expect } from '@jest/globals';
import { JwtService } from '../../shared/jwt.service';

describe('test', () => {
  let bc: Bc;
  let jwt: JwtService;
  let userdoa: UserDoa;
  let loginCommandHandler: LoginCommandHandler;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: UserDoa, useClass: UserDoaMock },
        { provide: JwtService, useClass: JwtServiceMock },
        { provide: Bc, useClass: BcMock },

        LoginCommandHandler,
      ],
    }).compile();

    userdoa = await app.resolve<UserDoa>(UserDoa);
    jwt = await app.resolve<JwtService>(JwtService);
    bc = await app.resolve<Bc>(Bc);
    loginCommandHandler = await app.resolve<LoginCommandHandler>(
      LoginCommandHandler,
    );
  });

  describe('test login ', () => {
    it('test login is done woth 200', async () => {
      const mockUser = User.mockUser();
      const body = LoginCommand.mockLoginCommand();
      const token = 'DDDDDDDDdao21o3o1o123';
      const user = jest.spyOn(userdoa, 'findOne').mockResolvedValue(mockUser);
      const compare = jest.spyOn(bc, 'comparePassword').mockResolvedValue(true);
      jest.spyOn(jwt, 'sign').mockResolvedValue(token);
      const result = await loginCommandHandler.execute(body);
      console.log('result', { result });
      expect(result).toBeDefined();
      expect(compare).toBeTruthy();
      expect(compare).toBeCalled();
      expect(user).toBeCalled();
      expect(result).toEqual({ token: 'DDDDDDDDdao21o3o1o123' });
    });
  });
});
