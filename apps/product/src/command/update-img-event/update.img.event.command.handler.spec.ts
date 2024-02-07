import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { of } from 'rxjs';

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
import { EventDoa } from '../../db/doa/event.doa';
import { UpdateImgEventCommandHandler } from './update.img.event.command.handler';
import { mockUpdateImgEventCommand } from '../../mock';

describe('update imgEventCommand', () => {
  let eventdoa: EventDoa;
  let httpSer: HttpService;

  let updateImgEventCom: UpdateImgEventCommandHandler;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        { provide: EventDoa, useFactory: createMock },
        { provide: HttpService, useFactory: createMock },

        UpdateImgEventCommandHandler,
      ],
    }).compile();

    updateImgEventCom = await app.get(UpdateImgEventCommandHandler);
    eventdoa = await app.get(EventDoa);
    httpSer = await app.resolve<HttpService>(HttpService);
  });
  it('update  orderImgCommand is done ', async () => {
    const body = mockUpdateImgEventCommand();

    const res = mockAxiosResponse({ data: { display_url: 'lslslsl' } });
    const obs = of(res);

    jest.spyOn(eventdoa, 'update').mockResolvedValue(true);
    jest.spyOn(httpSer, 'post').mockReturnValue(obs);

    const result = await updateImgEventCom.execute(body);

    expect(result).toBeDefined();
    expect(result).toBeTruthy();
  });

  it('update orderImgCommand  throw unknown error ', async () => {
    const res = mockAxiosResponse({ data: { display_url: 'lslslsl' } });
    const obs = of(res);

    const body = mockUpdateImgEventCommand();
    jest.spyOn(httpSer, 'post').mockReturnValue(obs);
    jest.spyOn(eventdoa, 'update').mockRejectedValue(false);

    try {
      await updateImgEventCom.execute(body);
    } catch (err) {
      expect(err).toBeInstanceOf(UnKnowApplicationException);
      expect((err as UnKnowApplicationException).message).toEqual(
        'Unexpected error occurred',
      );
    }
  });
});
