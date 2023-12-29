import { HttpService } from '@nestjs/axios';
import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AxiosError } from 'axios';
import { lastValueFrom } from 'rxjs';
import { URLSearchParams } from 'url';

import { UserDoa } from '../../db/doa/user.doa';

import { UniqueConstraintViolationDataAccessException } from '../../db/errors/unique-constraint-violation.exception';

import { UserAlreadyExistApplicationException } from '../../error/user.alreday.exist.application';

import { UpdateImgCommand } from './update.img.command';

@CommandHandler(UpdateImgCommand)
export class UpdateImgCommandHandler
  implements ICommandHandler<UpdateImgCommand>
{
  constructor(
    private readonly userdoa: UserDoa,

    private readonly http: HttpService,
  ) {}

  async execute(command: UpdateImgCommand) {
    try {
      const fromDate = new URLSearchParams();
      const img = command.img;

      fromDate.append('image', img);

      const { data } = await lastValueFrom(
        this.http.post(
          `https://api.imgbb.com/1/upload?key=898ab0c193c3ec2c099ca0cf8d071ee8`,
          fromDate,
        ),
      );

      return await this.userdoa.update(command.id, {
        img: data.data?.display_url,
      });
    } catch (Err) {
      if (Err instanceof AxiosError) {
        Logger.log('error in axios ', { Err });
        throw Err;
      }
      Logger.log('error in createUserCommandHandler', { Err });
      if (Err instanceof UniqueConstraintViolationDataAccessException) {
        throw new UserAlreadyExistApplicationException();
      }
      throw Err;
    }
  }
}
