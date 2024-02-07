import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { RestaurantDoa } from '../../db/doa/restaurant.doa';
import { UpdateRestaurantInfoCommandHandler } from './update.restaurant.info.command.handler';
import { mockUpdateRestaurantCommand } from '../../mock';
import { UnKnowApplicationException } from '../../error/unknown.application.exception';

describe('update eventCommandHandler', () => {
  let restdoa: RestaurantDoa;

  let updateResCom: UpdateRestaurantInfoCommandHandler;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        { provide: RestaurantDoa, useFactory: createMock },
        UpdateRestaurantInfoCommandHandler,
      ],
    }).compile();

    updateResCom = await app.get(UpdateRestaurantInfoCommandHandler);
    restdoa = await app.get(RestaurantDoa);
  });
  it('update   ResCommand is done ', async () => {
    const body = mockUpdateRestaurantCommand();

    jest.spyOn(restdoa, 'update').mockResolvedValue(true);

    const result = await updateResCom.execute(body);

    expect(result).toBeDefined();
    expect(result).toBeTruthy();
  });

  it('update ResCommand  throw unknown error ', async () => {
    jest.spyOn(restdoa, 'update').mockRejectedValue(false);
    const body = mockUpdateRestaurantCommand();

    try {
      await updateResCom.execute(body);
    } catch (err) {
      expect(err).toBeInstanceOf(UnKnowApplicationException);
      expect((err as UnKnowApplicationException).message).toEqual(
        'Unexpected error occurred',
      );
    }
  });
});
