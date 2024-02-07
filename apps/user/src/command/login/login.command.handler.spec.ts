import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { UserDoa } from '../../db/doa/user.doa';

import { ModelMapperService } from '../../db/service/modelMapper.service';
import {
  mockCreateUserCommand,
  mockCreateUserResponse,
  mockLoginCommand,
  mockUser,
  mockUserDto,
} from '../../mock';
import { Jwt } from 'y/lib/shared/jwt.service';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { UnKnowErrorApplicationException } from '../../error/unknown.error.application.exception';
import { LoginCommandHandler } from './login.command.handler';
import { UserNotFoundApplicationException } from '../../error/user-not-found.application.exception';
import { RecordNotFoundDataAccessException } from '../../db/errors/record-not-found.exception';
import { Bc } from 'y/lib/shared/bc.service';

describe('Login Command Handler', () => {
  let userdoa: UserDoa;

  let JwtSer: Jwt;
  let modelMap: ModelMapperService;
  let loginCommandHan: LoginCommandHandler;
  let bc: Bc;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        { provide: UserDoa, useFactory: createMock },
        { provide: Jwt, useFactory: createMock },
        { provide: ModelMapperService, useFactory: createMock },
        { provide: Bc, useFactory: createMock },
        LoginCommandHandler,
      ],
    }).compile();

    loginCommandHan = await app.get(LoginCommandHandler);
    userdoa = await app.get(UserDoa);
    JwtSer = await app.get(Jwt);
    bc = await app.get(Bc);
    modelMap = await app.get(ModelMapperService);
  });
  it('login command is done ', async () => {
    const token = mockCreateUserResponse();
    const userDto = mockUserDto();
    const body = mockLoginCommand();
    const user = mockUser();

    jest.spyOn(userdoa, 'findOne').mockResolvedValue(user);
    jest.spyOn(bc, 'comparePassword').mockResolvedValue(true);
    jest.spyOn(JwtSer, 'sign').mockResolvedValue(token.accessTok);
    jest.spyOn(JwtSer, 'refreshToken').mockResolvedValue(token.refreshToken);
    jest.spyOn(modelMap, 'modelToDto').mockReturnValue(userDto);

    const result = await loginCommandHan.execute(body);

    expect(result).toBeDefined();
    expect(result.accessToken).toEqual(token.accessTok);
    expect(result.refreshToken).toEqual(token.refreshToken);
  });

  it(' login command throw email is not found ', async () => {
    const err0r = new RecordNotFoundDataAccessException(
      new EntityNotFoundError('', []),
    );

    const token = mockCreateUserResponse();
    const userDto = mockUserDto();
    const body = mockCreateUserCommand();

    jest.spyOn(userdoa, 'findOne').mockRejectedValue(err0r);
    jest.spyOn(JwtSer, 'sign').mockResolvedValue(token.accessTok);
    jest.spyOn(bc, 'comparePassword').mockResolvedValue(true);
    jest.spyOn(JwtSer, 'refreshToken').mockResolvedValue(token.refreshToken);
    jest.spyOn(modelMap, 'modelToDto').mockReturnValue(userDto);

    try {
      await loginCommandHan.execute(body);
    } catch (err) {
      expect(err).toBeInstanceOf(UserNotFoundApplicationException);
      expect((err as UserNotFoundApplicationException).message).toEqual(
        'user not found',
      );
    }
  });

  it('login command  throw unknown error ', async () => {
    const err0r = 'unKnow Error';
    const token = mockCreateUserResponse();
    const userDto = mockUserDto();
    const body = mockCreateUserCommand();

    jest.spyOn(userdoa, 'findOne').mockRejectedValue(err0r);
    jest.spyOn(JwtSer, 'sign').mockResolvedValue(token.accessTok);
    jest.spyOn(bc, 'comparePassword').mockResolvedValue(true);
    jest.spyOn(JwtSer, 'refreshToken').mockResolvedValue(token.refreshToken);
    jest.spyOn(modelMap, 'modelToDto').mockReturnValue(userDto);

    try {
      await loginCommandHan.execute(body);
    } catch (err) {
      expect(err).toBeInstanceOf(UnKnowErrorApplicationException);
      expect((err as UnKnowErrorApplicationException).message).toEqual(
        'Unexpected error occurred',
      );
    }
  });
});
