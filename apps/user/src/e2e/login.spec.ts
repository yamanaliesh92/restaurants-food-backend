import * as request from 'supertest';
import { expect } from '@jest/globals';

describe('login', () => {
  it('login post should return 200', async () => {
    const email = 'test12@example.com';

    const password = 'testPassword';
    const requestBody = { email, password };

    const response = await request('http://localhost:8080')
      .post('/api/auth/user/login')
      .send(requestBody)
      .expect(200);

    const { accessToken } = response.body;

    console.log('res', { r: response.body });

    expect(accessToken).toBeDefined();
  });

  it.only('login post should throw email or password is not correct ', async () => {
    const email = 'test112@example.com';

    // const password = 'testPassword';
    const requestBody = { email };

    const response = await request('http://localhost:8080')
      .post('/api/auth/user/login')
      .send(requestBody)
      .expect(400);

    expect(response.statusCode).toEqual(400);
  });

  it('login post should throw email or password is not correct ', async () => {
    const email = 'test112@example.com';

    const password = 'testPassword';
    const requestBody = { email, password };

    const response = await request('http://localhost:8080')
      .post('/api/auth/user/login')
      .send(requestBody)
      .expect(400);

    expect(response.statusCode).toEqual(400);
  });
});
