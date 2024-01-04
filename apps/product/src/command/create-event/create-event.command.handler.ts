import { HttpService } from '@nestjs/axios';

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AxiosError } from 'axios';

import { lastValueFrom } from 'rxjs';
import { URLSearchParams } from 'url';
import { EventDoa } from '../../db/doa/event.doa';

import { CreateEventEntityDto } from '../../db/dto/createEventEntity.dto';
import { EventDto } from '../../db/dto/event.dto';

import { ModelMapperServiceEvent } from '../../db/service/modelMapperEvent.service';

import { AxiosApplicationException } from '../../error/axios.application.exception';
import { UnKnowApplicationException } from '../../error/unknown.application.exception';
import { CreateEventCommand } from './create-event.commadn';

@CommandHandler(CreateEventCommand)
export class CreateEventCommandHandler
  implements ICommandHandler<CreateEventCommand>
{
  constructor(
    private readonly eventdoa: EventDoa,
    private readonly http: HttpService,
    private readonly model: ModelMapperServiceEvent,
  ) {}

  async execute(command: CreateEventCommand): Promise<EventDto> {
    try {
      const fromDate = new URLSearchParams();
      const imgOrder = command.imgOrder;
      const name = command.name;
      const newPrice = command.newPrice;
      const oldPrice = command.oldPrice;
      const date = command.date;

      const description = command.description;
      const userId = command.userId;
      const restaurantId = command.restaurantId;
      const category = command.category;

      fromDate.append('image', imgOrder);
      fromDate.append('name', category);
      fromDate.append('description', description);

      fromDate.append('name', name);
      fromDate.append('userId', String(userId));
      fromDate.append('newPrice', String(newPrice));
      fromDate.append('oldPrice', String(oldPrice));
      fromDate.append('date', String(date));
      fromDate.append('restaurantId', String(restaurantId));

      const { data } = await lastValueFrom(
        this.http.post(
          `https://api.imgbb.com/1/upload?key=898ab0c193c3ec2c099ca0cf8d071ee8`,
          fromDate,
        ),
      );

      const model: CreateEventEntityDto = {
        name: command.name,
        newPrice: command.newPrice,
        oldPrice: command.oldPrice,
        date: command.date,
        userId: command.userId,
        description: command.description,
        restaurantId: command.restaurantId,
        category: command.category,
        imgOrder: data.data?.display_url,
      };
      const result = await this.eventdoa.save(model);
      return this.model.EventToDto(result);
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new AxiosApplicationException();
      }

      throw new UnKnowApplicationException();
    }
  }
}
