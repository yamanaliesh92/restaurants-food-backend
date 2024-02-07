import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { UserDoa } from '../../db/doa/user.doa';

import {
  mockCreateUserResponse,
  mockUpdateUserCommand,
  mockUser,
  mockUserDto,
} from '../../mock';

import { UnKnowErrorApplicationException } from '../../error/unknown.error.application.exception';

import { UpdateUserCommandHandler } from './update_user.command.handler';

describe('Update Command Handler', () => {
  let userdoa: UserDoa;

  let updateCommadnHan: UpdateUserCommandHandler;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        { provide: UserDoa, useFactory: createMock },
        UpdateUserCommandHandler,
      ],
    }).compile();

    updateCommadnHan = await app.get(UpdateUserCommandHandler);
    userdoa = await app.get(UserDoa);
  });
  it('update command is done ', async () => {
    const body = mockUpdateUserCommand();
    const user = mockUser();

    jest.spyOn(userdoa, 'update').mockResolvedValue(true);

    const result = await updateCommadnHan.execute(body);

    expect(result).toBeDefined();
    expect(result).toBeTruthy;
  });

  it('update command  throw unknown error ', async () => {
    const token = mockCreateUserResponse();
    const userDto = mockUserDto();
    const body = mockUpdateUserCommand();

    jest.spyOn(userdoa, 'update').mockRejectedValue(false);

    try {
      await updateCommadnHan.execute(body);
    } catch (err) {
      expect(err).toBeInstanceOf(UnKnowErrorApplicationException);
      expect((err as UnKnowErrorApplicationException).message).toEqual(
        'Unexpected error occurred',
      );
    }
  });
});
