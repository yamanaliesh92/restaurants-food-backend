import * as request from 'supertest';
import { expect } from '@jest/globals';
describe('create a Restaurant', () => {
  it('a/pi /post should create a restaurant', async () => {
    const name = 'testRestaurant';
    const address = 'testAddress';
    const requestBody = { name, address };

    const response = await request('http://localhost:8080')
      .post('/api/restaurant/create')
      .set(
        'authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTcwNTkxMzEzOSwiZXhwIjoxNzA1OTk5NTM5fQ.pW6ITLQIevLZKAo-aPfejIZ6oyYZU_nNaz09I0ZH51Y',
      )
      .set(
        'refresh',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTcwNTkxMzEzOSwiZXhwIjoxNzA2NTE3OTM5fQ.bdWbsEmDim9d7iLL7A153axiV60xBj9Pz_chJu_zH1E',
      )
      .send(requestBody)
      .expect(201);

    const { nameRes, addressRes } = response.body;

    expect(requestBody.name).toEqual(nameRes);
    expect(requestBody.address).toEqual(addressRes);
  });
});
