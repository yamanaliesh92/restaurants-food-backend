import { CreateUserCommand } from '../command/create-user/create-user.command';
import { faker } from '@faker-js/faker';
import { UserDto } from '../db/dto/user.dto';
import { User } from '../db/model/user.model';
import { LoginCommand } from '../command/login/login.command';
import { UpdateUserCommand } from '../command/update-user/update_user.command';
import { GetUserQuery } from '../query/get-user/get-user.query';

export const mockCreateUserCommand = () => {
  return new CreateUserCommand({
    email: 'test@gamilc.om',
    password: 'testPassword',
    username: 'test',
  });
};

export const mockLoginCommand = () => {
  return new LoginCommand({
    email: 'test@gamilc.om',
    password: 'testPassword',
  });
};

export const mockGetUserQuery = () => {
  return new GetUserQuery({
    id: 12,
  });
};

export const mockCreateUserResponse = () => {
  return {
    accessTok: 'acessTokenAccessTokem',
    refreshToken: 'refreshTokenRefreshToken',
  };
};

export const mockUpdateUserCommand = () => {
  return new UpdateUserCommand({
    username: 'update',
    id: 124,
  });
};

export function mockUserDto() {
  return new UserDto({
    email: 'test@gamilc.om',
    username: 'test',

    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    id: 12,
  });
}

export function mockUser() {
  return new User({
    email: 'test@gamilc.om',
    password: 'testPassword',
    username: 'test',
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    id: 12,
  });
}
