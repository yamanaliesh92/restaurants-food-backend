import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';

import { UnKnowApplicationException } from '../../error/unknown.application.exception';
import { EventDoa } from '../../db/doa/event.doa';
import { DeleteEventCommandHandler } from './delete-event.command.handler';
import { mockDeleteEventCommand } from '../../mock';

describe('delete orderCommandHandler', () => {
  let eventdao: EventDoa;

  let deleteEventComm: DeleteEventCommandHandler;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        { provide: EventDoa, useFactory: createMock },
        DeleteEventCommandHandler,
      ],
    }).compile();

    deleteEventComm = await app.get(DeleteEventCommandHandler);
    eventdao = await app.get(EventDoa);
  });
  it('delete   orderCommand is done ', async () => {
    const id = mockDeleteEventCommand();

    jest.spyOn(eventdao, 'delete').mockResolvedValue(true);

    const result = await deleteEventComm.execute(id);

    expect(result).toBeDefined();
    expect(result).toBeTruthy();
  });

  it('delete deleteCommand  throw unknown error ', async () => {
    jest.spyOn(eventdao, 'delete').mockRejectedValue(false);
    const id = mockDeleteEventCommand();

    try {
      await deleteEventComm.execute(id);
    } catch (err) {
      expect(err).toBeInstanceOf(UnKnowApplicationException);
      expect((err as UnKnowApplicationException).message).toEqual(
        'Unexpected error occurred',
      );
    }
  });
});
