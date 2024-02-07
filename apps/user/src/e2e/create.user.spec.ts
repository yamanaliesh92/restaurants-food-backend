import * as request from 'supertest';
import { expect } from '@jest/globals';
describe('AuthController (e2e)', () => {
  it('/api/auth/user/create (POST) should create a user ', async () => {
    const email = 'test12@example.com';
    const username = 'test';
    const password = 'testPassword';
    const requestBody = { email, username, password };

    const response = await request('http://localhost:8080')
      .post('/api/auth/user/create')
      .send(requestBody)
      .expect(201);

    const { accessToken } = response.body;

    expect(accessToken).toBeDefined();
  });

  it.only('/api/auth/user/create (POST) should throw  Bad Request ', async () => {
    const email = 'test12@example.com';

    const password = 'testPassword';
    const requestBody = { email, password };

    const response = await request('http://localhost:8080')
      .post('/api/auth/user/create')
      .send(requestBody)
      .expect(400);

    console.log('res', { response });
    expect(response.statusCode).toEqual(400);
  });
  it(' /api/auth/user/create (POST)  should throw bad request email already exist ', async () => {
    const email = 'test12@example.com';
    const username = 'test';
    const password = 'testPassword';
    const requestBody = { email, username, password };

    const response = await request('http://localhost:8080')
      .post('/api/auth/user/create')
      .send(requestBody)
      .expect(400);

    console.log('error', response);

    const { message, statusCode } = response.body;
    expect(statusCode).toEqual(400);
    expect(message).toEqual('User with the same email already exist');
  });
});
