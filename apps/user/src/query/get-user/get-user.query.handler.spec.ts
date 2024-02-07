import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { UserDoa } from '../../db/doa/user.doa';

import { ModelMapperService } from '../../db/service/modelMapper.service';
import {
  mockCreateUserResponse,
  mockGetUserQuery,
  mockUser,
  mockUserDto,
} from '../../mock';

import { EntityNotFoundError } from 'typeorm';
import { UnKnowErrorApplicationException } from '../../error/unknown.error.application.exception';

import { UserNotFoundApplicationException } from '../../error/user-not-found.application.exception';
import { RecordNotFoundDataAccessException } from '../../db/errors/record-not-found.exception';

import { GetOneUserQueryHandler } from './get-user.query.handler';

describe('Get User Query Handler', () => {
  let userdoa: UserDoa;

  let modelMap: ModelMapperService;
  let getUserQue: GetOneUserQueryHandler;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        { provide: UserDoa, useFactory: createMock },

        { provide: ModelMapperService, useFactory: createMock },

        GetOneUserQueryHandler,
      ],
    }).compile();

    getUserQue = await app.get(GetOneUserQueryHandler);
    userdoa = await app.get(UserDoa);

    modelMap = await app.get(ModelMapperService);
  });
  it('get user query is done ', async () => {
    const userDto = mockUserDto();
    const body = mockGetUserQuery();
    const user = mockUser();

    jest.spyOn(userdoa, 'findOne').mockResolvedValue(user);

    jest.spyOn(modelMap, 'modelToDto').mockReturnValue(userDto);

    const result = await getUserQue.execute(body);

    expect(result).toBeDefined();
    expect(result.email).toEqual(user.email);
  });

  it('get user query throw user is not found ', async () => {
    const err0r = new RecordNotFoundDataAccessException(
      new EntityNotFoundError('', []),
    );

    const token = mockCreateUserResponse();
    const userDto = mockUserDto();
    const body = mockGetUserQuery();

    jest.spyOn(userdoa, 'findOne').mockRejectedValue(err0r);

    jest.spyOn(modelMap, 'modelToDto').mockReturnValue(userDto);

    try {
      await getUserQue.execute(body);
    } catch (err) {
      expect(err).toBeInstanceOf(UserNotFoundApplicationException);
      expect((err as UserNotFoundApplicationException).message).toEqual(
        'user not found',
      );
    }
  });

  it('get user query throw unknown error ', async () => {
    const err0r = 'unKnow Error';
    const token = mockCreateUserResponse();
    const userDto = mockUserDto();
    const body = mockGetUserQuery();

    jest.spyOn(userdoa, 'findOne').mockRejectedValue(err0r);

    jest.spyOn(modelMap, 'modelToDto').mockReturnValue(userDto);

    try {
      await getUserQue.execute(body);
    } catch (err) {
      expect(err).toBeInstanceOf(UnKnowErrorApplicationException);
      expect((err as UnKnowErrorApplicationException).message).toEqual(
        'Unexpected error occurred',
      );
    }
  });
});
