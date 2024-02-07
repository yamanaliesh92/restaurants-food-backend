import * as request from 'supertest';
import { expect } from '@jest/globals';
describe('Get a User', () => {
  it('/api/auth/user/me should return a user', async () => {
    const response = await request('http://localhost:8080')
      .get('/api/auth/user/me')
      .set(
        'authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTcwNTkxMzEzOSwiZXhwIjoxNzA1OTk5NTM5fQ.pW6ITLQIevLZKAo-aPfejIZ6oyYZU_nNaz09I0ZH51Y',
      )
      .set(
        'refresh',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTcwNTkxMzEzOSwiZXhwIjoxNzA2NTE3OTM5fQ.bdWbsEmDim9d7iLL7A153axiV60xBj9Pz_chJu_zH1E',
      )
      .expect(200);

    expect(response.statusCode).toEqual(200);
  });
});
