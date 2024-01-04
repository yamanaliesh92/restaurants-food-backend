import { InternalServerErrorException } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserCommand } from '../command/create-user/create-user.command';
import { CreateUserCommandHandler } from '../command/create-user/create-user.command.handler';
import { UserDoa } from '../db/doa/user.doa';
import { User } from '../db/entity/user.entity';
import { BcMock } from '../mock/bc.mock';
import { JwtServiceMock } from '../mock/jwt.mock';
import { UserDoaMock } from '../mock/user.doa';
import { Bc } from '../shared/bc.service';
import { JwtService } from '../shared/jwt.service';
import { expect } from '@jest/globals';

describe('create User', () => {
  let create: CreateUserCommandHandler;
  let userdoa: UserDoa;
  let bc: Bc;
  let jwt: JwtService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: UserDoa, useClass: UserDoaMock },
        { provide: JwtService, useClass: JwtServiceMock },
        { provide: Bc, useClass: BcMock },

        CreateUserCommandHandler,
      ],
    }).compile();

    userdoa = await app.resolve<UserDoa>(UserDoa);
    jwt = await app.resolve<JwtService>(JwtService);
    bc = await app.resolve<Bc>(Bc);
    create = await app.resolve<CreateUserCommandHandler>(
      CreateUserCommandHandler,
    );
  });

  describe('test', () => {
    it('create user is done', async () => {
      const user = User.mockUser();
      const body = CreateUserCommand.mockCreateUserCommand();
      const token = '1adsa131e3sd13';
      const save = jest.spyOn(userdoa, 'save').mockResolvedValue(user);

      const hash = jest
        .spyOn(bc, 'hashPassword')
        .mockResolvedValue(body.password);
      const sign = jest.spyOn(jwt, 'sign').mockResolvedValue(token);
      const result = await create.execute(body);

      expect(result).toBeDefined();
      expect(sign).toBeCalled();
      expect(hash).toBeCalled();
      expect(save).toBeCalled();
      expect(result.token).toEqual(token);
      expect(result.user).toEqual(user);
    });

    it('create user with filed from userdoa', async () => {
      const body = CreateUserCommand.mockCreateUserCommand();
      const password = body.password;
      const token = 'dddddaaaaa121';
      jest.spyOn(bc, 'hashPassword').mockResolvedValue(password);
      jest.spyOn(jwt, 'sign').mockResolvedValue(token);
      jest
        .spyOn(userdoa, 'save')
        .mockRejectedValue(new InternalServerErrorException());

      expect(async () => await create.execute(body)).rejects.toThrowError(
        new InternalServerErrorException('some thing went wrong'),
      );
    });

    it('create user with filed from hashPassword', async () => {
      const body = CreateUserCommand.mockCreateUserCommand();
      const password = body.password;
      const user = User.mockUser();
      const token = 'dddddaaaaa121';
      jest
        .spyOn(bc, 'hashPassword')
        .mockRejectedValue(new InternalServerErrorException());
      jest.spyOn(jwt, 'sign').mockResolvedValue(token);
      jest.spyOn(userdoa, 'save').mockResolvedValue(user);

      expect(async () => await create.execute(body)).rejects.toThrowError(
        new InternalServerErrorException('some thing went wrong'),
      );
    });

    it('create user with filed from sign', async () => {
      const body = CreateUserCommand.mockCreateUserCommand();
      const password = body.password;
      const user = User.mockUser();

      jest.spyOn(bc, 'hashPassword').mockResolvedValue(password);
      jest
        .spyOn(jwt, 'sign')
        .mockRejectedValue(new InternalServerErrorException());
      jest.spyOn(userdoa, 'save').mockResolvedValue(user);

      expect(async () => await create.execute(body)).rejects.toThrowError(
        new InternalServerErrorException('some thing went wrong'),
      );
    });
  });
});
