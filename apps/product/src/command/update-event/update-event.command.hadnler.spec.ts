import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';

import { UnKnowApplicationException } from '../../error/unknown.application.exception';
import { EventDoa } from '../../db/doa/event.doa';
import { UpdateEventCommandHandler } from './update.event.command.handler';
import { mockUpdateEventCommand } from '../../mock';

describe('update eventCommandHandler', () => {
  let eventdoa: EventDoa;

  let updateEevCom: UpdateEventCommandHandler;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        { provide: EventDoa, useFactory: createMock },
        UpdateEventCommandHandler,
      ],
    }).compile();

    updateEevCom = await app.get(UpdateEventCommandHandler);
    eventdoa = await app.get(EventDoa);
  });
  it('update   eventCommand is done ', async () => {
    const body = mockUpdateEventCommand();

    jest.spyOn(eventdoa, 'update').mockResolvedValue(true);

    const result = await updateEevCom.execute(body);

    expect(result).toBeDefined();
    expect(result).toBeTruthy();
  });

  it('update eventCommand  throw unknown error ', async () => {
    jest.spyOn(eventdoa, 'update').mockRejectedValue(false);
    const body = mockUpdateEventCommand();

    try {
      await updateEevCom.execute(body);
    } catch (err) {
      expect(err).toBeInstanceOf(UnKnowApplicationException);
      expect((err as UnKnowApplicationException).message).toEqual(
        'Unexpected error occurred',
      );
    }
  });
});
