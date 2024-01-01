import { HttpService } from '@nestjs/axios';

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AxiosError } from 'axios';

import { lastValueFrom } from 'rxjs';
import { URLSearchParams } from 'url';
import { OrderDoa } from '../../db/doa/order.doa';
import { AxiosApplicationException } from '../../error/axios.applaction.exception';
import { UnKnowApplicationException } from '../../error/unKnow.appliaction.exception';
import { UpdateImgOrderCommand } from './update.imgOrder.command';

@CommandHandler(UpdateImgOrderCommand)
export class UpdateImgOrderCommandHandler
  implements ICommandHandler<UpdateImgOrderCommand>
{
  constructor(
    private readonly orderdoa: OrderDoa,
    private readonly http: HttpService,
  ) {}

  async execute(command: UpdateImgOrderCommand): Promise<boolean> {
    try {
      const fromDate = new URLSearchParams();
      const img = command.imgOrder;

      fromDate.append('image', img);

      const { data } = await lastValueFrom(
        this.http.post(
          `https://api.imgbb.com/1/upload?key=898ab0c193c3ec2c099ca0cf8d071ee8`,
          fromDate,
        ),
      );

      const displayUrl = data?.data?.display_url;

      return this.orderdoa.update(command.id, { imgOrder: displayUrl });
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new AxiosApplicationException();
      }

      throw new UnKnowApplicationException();
    }
  }
}
