import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';

import { NotFoundApplicationException } from '../../error/record-not-found.application.exception';
import { NotFoundDataAccessException } from '../../db/error/notFoundError.access.exception';
import { EventDoa } from '../../db/doa/event.doa';
import { ModelMapperServiceEvent } from '../../db/service/modelMapperEvent.service';
import { GetOneEventQueryHandler } from './get-one.event.query.handler';
import { mockEvent, mockEventDto, mockGetOneEventQuery } from '../../mock';

import { EntityNotFoundError } from 'typeorm';
import { UnKnowApplicationException } from '../../error/unknown.application.exception';

describe('get OrderQueryHandler', () => {
  let eventdoa: EventDoa;

  let modelMap: ModelMapperServiceEvent;
  let getEventQe: GetOneEventQueryHandler;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        { provide: EventDoa, useFactory: createMock },

        { provide: ModelMapperServiceEvent, useFactory: createMock },
        GetOneEventQueryHandler,
      ],
    }).compile();

    getEventQe = await app.get(GetOneEventQueryHandler);
    eventdoa = await app.get(EventDoa);
    modelMap = await app.get(ModelMapperServiceEvent);
  });

  it('get oneOrderQuery is done ', async () => {
    const orderDto = mockEventDto();

    const body = mockGetOneEventQuery();
    const order = mockEvent();

    jest.spyOn(eventdoa, 'findOne').mockResolvedValue(order);

    jest.spyOn(modelMap, 'EventToDto').mockReturnValue(orderDto);

    const result = await getEventQe.execute(body);

    expect(result).toBeDefined();
    expect(result.id).toEqual(order.id);
  });

  it('get order query   throw order is not found ', async () => {
    const err0r = new NotFoundDataAccessException(
      new EntityNotFoundError('', []),
    );

    const orderDto = mockEventDto();
    const body = mockGetOneEventQuery();

    jest.spyOn(eventdoa, 'findOne').mockRejectedValue(err0r);

    jest.spyOn(modelMap, 'EventToDto').mockReturnValue(orderDto);

    try {
      await getEventQe.execute(body);
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundApplicationException);
      expect((err as NotFoundApplicationException).message).toEqual(
        'the record we are looking for was not found',
      );
    }
  });

  it('get order query   throw unknown error ', async () => {
    const err0r = 'unKnow Error';

    const orderDto = mockEventDto();

    const body = mockGetOneEventQuery();

    jest.spyOn(eventdoa, 'findOne').mockRejectedValue(err0r);

    jest.spyOn(modelMap, 'EventToDto').mockReturnValue(orderDto);

    try {
      await getEventQe.execute(body);
    } catch (err) {
      expect(err).toBeInstanceOf(UnKnowApplicationException);
      expect((err as UnKnowApplicationException).message).toEqual(
        'Unexpected error occurred',
      );
    }
  });
});
