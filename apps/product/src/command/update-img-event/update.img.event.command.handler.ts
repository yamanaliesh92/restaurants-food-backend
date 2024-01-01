import { HttpService } from '@nestjs/axios';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AxiosError } from 'axios';

import { lastValueFrom } from 'rxjs';
import { URLSearchParams } from 'url';
import { EventDoa } from '../../db/doa/event.doa';
import { AxiosApplicationException } from '../../error/axios.applaction.exception';
import { UnKnowApplicationException } from '../../error/unKnow.appliaction.exception';
import { UpdateImgEventCommand } from './update.img.event.command';

@CommandHandler(UpdateImgEventCommand)
export class UpdateEventCommandHandler
  implements ICommandHandler<UpdateImgEventCommand>
{
  constructor(
    private readonly evetndoa: EventDoa,
    private readonly http: HttpService,
  ) {}

  async execute(command: UpdateImgEventCommand): Promise<boolean> {
    try {
      const fromDate = new URLSearchParams();
      const imgOrder = command.imgOrder;

      fromDate.append('image', imgOrder);

      const { data } = await lastValueFrom(
        this.http.post(
          `https://api.imgbb.com/1/upload?key=898ab0c193c3ec2c099ca0cf8d071ee8`,
          fromDate,
        ),
      );

      Logger.log('dea', data?.data?.display_url);

      return await this.evetndoa.update(command.id, {
        imgOrder: data?.data?.display_url,
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new AxiosApplicationException();
      }

      throw new UnKnowApplicationException();
    }
  }
}
