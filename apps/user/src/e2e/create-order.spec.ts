import * as request from 'supertest';
import { expect } from '@jest/globals';

describe('create a Restaurant', () => {
  it('create a order should create a order with success', async () => {
    const name = 'testname';
    const price = 12;
    const category = 'testCat';

    const description = 'DesTest';
    const restaurantId = 3;

    const response = await request('http://localhost:8080')
      .post('/api/order/create')
      .set(
        'authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTcwNTkxMzEzOSwiZXhwIjoxNzA1OTk5NTM5fQ.pW6ITLQIevLZKAo-aPfejIZ6oyYZU_nNaz09I0ZH51Y',
      )
      .set(
        'refresh',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTcwNTkxMzEzOSwiZXhwIjoxNzA2NTE3OTM5fQ.bdWbsEmDim9d7iLL7A153axiV60xBj9Pz_chJu_zH1E',
      )
      .set('Content-Type', 'multipart/form-data')
      .attach('imgOrder', '/home/al_yaman/Pictures/egges.jpeg')
      .field('price', price)
      .field('name', name)
      .field('category', category)
      .field('description', description)
      .field('restaurantId', restaurantId);

    const { nameRes, priceRes } = response.body;

    expect(name).toEqual(nameRes);
    expect(price).toEqual(priceRes);
  });

  it('create a order  should throw internal server Error', async () => {
    const name = 'testname';
    const price = 12;
    const category = 'testCat';

    const description = 'DesTest';
    const restaurantId = 31;

    const response = await request('http://localhost:8080')
      .post('/api/order/create')
      .set(
        'authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTcwNTkxMzEzOSwiZXhwIjoxNzA1OTk5NTM5fQ.pW6ITLQIevLZKAo-aPfejIZ6oyYZU_nNaz09I0ZH51Y',
      )
      .set(
        'refresh',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTcwNTkxMzEzOSwiZXhwIjoxNzA2NTE3OTM5fQ.bdWbsEmDim9d7iLL7A153axiV60xBj9Pz_chJu_zH1E',
      )
      .set('Content-Type', 'multipart/form-data')
      .attach('imgOrder', '/home/al_yaman/Pictures/egges.jpeg')
      .field('price', price)
      .field('name', name)
      .field('category', category)
      .field('description', description)
      .field('restaurantId', restaurantId);
    console.log('res', { response });

    expect(response.body.statusCode).toEqual(500);
    expect(response.body.message).toEqual(
      'some thing went wrong please try again....',
    );
  });
});
