import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { of } from 'rxjs';

import { mockEventDto, mockEvent, mockCreateEventCommand } from '../../mock';
import { UnKnowApplicationException } from '../../error/unknown.application.exception';

export const mockAxiosResponse = (data: any): AxiosResponse => ({
  data,
  status: 200,
  statusText: '200',
  config: {} as any,
  headers: {},
});
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { CreateEventCommandHandler } from './create-event.command.handler';
import { ModelMapperServiceEvent } from '../../db/service/modelMapperEvent.service';
import { EventDoa } from '../../db/doa/event.doa';

describe('create Order', () => {
  let eventdoa: EventDoa;
  let httpSer: HttpService;

  let modelMap: ModelMapperServiceEvent;
  let createEventComm: CreateEventCommandHandler;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        { provide: EventDoa, useFactory: createMock },
        { provide: HttpService, useFactory: createMock },
        { provide: ModelMapperServiceEvent, useFactory: createMock },
        CreateEventCommandHandler,
      ],
    }).compile();

    createEventComm = await app.get(CreateEventCommandHandler);
    eventdoa = await app.get(EventDoa);
    httpSer = await app.resolve<HttpService>(HttpService);
    modelMap = await app.get(ModelMapperServiceEvent);
  });
  it('create  eventCommand is done ', async () => {
    const eventDto = mockEventDto();
    const body = mockCreateEventCommand();
    const order = mockEvent();
    const res = mockAxiosResponse({ data: { display_url: 'lslslsl' } });
    const obs = of(res);

    jest.spyOn(eventdoa, 'save').mockResolvedValue(order);
    jest.spyOn(httpSer, 'post').mockReturnValue(obs);
    jest.spyOn(modelMap, 'EventToDto').mockReturnValue(eventDto);

    const result = await createEventComm.execute(body);

    expect(result).toBeDefined();
    expect(result.id).toEqual(order.id);
    expect(result.newPrice).toEqual(order.newPrice);
  });

  it('create eventCommand  throw unknown error ', async () => {
    const res = mockAxiosResponse({ data: { display_url: 'lslslsl' } });
    const obs = of(res);
    const err0r = 'unKnow Error';

    const eventDto = mockEventDto();
    const body = mockCreateEventCommand();
    jest.spyOn(httpSer, 'post').mockReturnValue(obs);
    jest.spyOn(eventdoa, 'save').mockRejectedValue(err0r);

    jest.spyOn(modelMap, 'EventToDto').mockReturnValue(eventDto);

    try {
      await createEventComm.execute(body);
    } catch (err) {
      expect(err).toBeInstanceOf(UnKnowApplicationException);
      expect((err as UnKnowApplicationException).message).toEqual(
        'Unexpected error occurred',
      );
    }
  });
});
