import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { Bc } from 'y/lib/shared/bc.service';
import { UserDoa } from '../../db/doa/user.doa';

import { CreateUserCommandHandler } from './create-user.command.handler';
import { ModelMapperService } from '../../db/service/modelMapper.service';
import {
  mockCreateUserCommand,
  mockCreateUserResponse,
  mockUser,
  mockUserDto,
} from '../../mock';
import { Jwt } from 'y/lib/shared/jwt.service';
import { QueryFailedError } from 'typeorm';
import { UniqueConstraintViolationDataAccessException } from '../../db/errors/unique-constraint-violation.exception';
import { UserAlreadyExistApplicationException } from '../../error/user.already.exist.application';
import { UnKnowErrorApplicationException } from '../../error/unknown.error.application.exception';

describe('create user', () => {
  let userdoa: UserDoa;
  let bc: Bc;
  let JwtSer: Jwt;
  let modelMap: ModelMapperService;
  let createUserCommandHan: CreateUserCommandHandler;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        { provide: UserDoa, useFactory: createMock },
        { provide: Jwt, useFactory: createMock },
        { provide: ModelMapperService, useFactory: createMock },
        { provide: Bc, useFactory: createMock },
        CreateUserCommandHandler,
      ],
    }).compile();

    createUserCommandHan = await app.get(CreateUserCommandHandler);
    userdoa = await app.get(UserDoa);
    bc = await app.get(Bc);
    JwtSer = await app.get(Jwt);
    modelMap = await app.get(ModelMapperService);
  });
  it('create  userCommand is done ', async () => {
    const hashPassword = 'hashPasswordHashPasssword';
    const token = mockCreateUserResponse();
    const userDto = mockUserDto();
    const body = mockCreateUserCommand();
    const user = mockUser();

    jest.spyOn(bc, 'hashPassword').mockResolvedValue(hashPassword);
    jest.spyOn(userdoa, 'save').mockResolvedValue(user);
    jest.spyOn(JwtSer, 'sign').mockResolvedValue(token.accessTok);
    jest.spyOn(JwtSer, 'refreshToken').mockResolvedValue(token.refreshToken);
    jest.spyOn(modelMap, 'modelToDto').mockReturnValue(userDto);

    const result = await createUserCommandHan.execute(body);

    expect(result).toBeDefined();
    expect(result.accessToken).toEqual(token.accessTok);
    expect(result.refreshToken).toEqual(token.refreshToken);
  });

  it('create  userCommand throw email is already exist ', async () => {
    const err0r = new UniqueConstraintViolationDataAccessException(
      new QueryFailedError('', [], { name: 'e', message: 'e' }),
    );
    const hashPassword = 'hashPasswordHashPasssword';
    const token = mockCreateUserResponse();
    const userDto = mockUserDto();
    const body = mockCreateUserCommand();

    jest.spyOn(bc, 'hashPassword').mockResolvedValue(hashPassword);
    jest.spyOn(userdoa, 'save').mockRejectedValue(err0r);
    jest.spyOn(JwtSer, 'sign').mockResolvedValue(token.accessTok);
    jest.spyOn(JwtSer, 'refreshToken').mockResolvedValue(token.refreshToken);
    jest.spyOn(modelMap, 'modelToDto').mockReturnValue(userDto);

    try {
      await createUserCommandHan.execute(body);
    } catch (err) {
      expect(err).toBeInstanceOf(UserAlreadyExistApplicationException);
      expect((err as UserAlreadyExistApplicationException).message).toEqual(
        'user already exist',
      );
    }
  });

  it('create userCommand  throw unknown error ', async () => {
    const err0r = 'unKnow Error';
    const hashPassword = 'hashPasswordHashPasssword';
    const token = mockCreateUserResponse();
    const userDto = mockUserDto();
    const body = mockCreateUserCommand();

    jest.spyOn(bc, 'hashPassword').mockResolvedValue(hashPassword);
    jest.spyOn(userdoa, 'save').mockRejectedValue(err0r);
    jest.spyOn(JwtSer, 'sign').mockResolvedValue(token.accessTok);
    jest.spyOn(JwtSer, 'refreshToken').mockResolvedValue(token.refreshToken);
    jest.spyOn(modelMap, 'modelToDto').mockReturnValue(userDto);

    try {
      await createUserCommandHan.execute(body);
    } catch (err) {
      expect(err).toBeInstanceOf(UnKnowErrorApplicationException);
      expect((err as UnKnowErrorApplicationException).message).toEqual(
        'Unexpected error occurred',
      );
    }
  });
});
