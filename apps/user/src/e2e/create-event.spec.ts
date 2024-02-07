import * as request from 'supertest';
import { expect } from '@jest/globals';
import { faker } from '@faker-js/faker';

describe('create a Restaurant', () => {
  it.only('create a order should create a order with success', async () => {
    const name = 'testname';
    const oldPrice = 12;
    const newPrice = 10;
    const category = 'testCat';
    const date = faker.date.future();

    const description = 'DesTest';
    const restaurantId = 3;

    const response = await request('http://localhost:8080')
      .post('/api/event')
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
      .field('oldPrice', oldPrice)
      .field('newPrice', newPrice)
      .field('name', name)
      .field('category', category)
      .field('description', description)
      .field('date', date.toISOString())
      .field('restaurantId', restaurantId);

    const { oldPriceRes, newPriceRes } = response.body;

    console.log('pice', response);

    expect(oldPrice).toEqual(oldPriceRes);
    expect(newPrice).toEqual(newPriceRes);
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
