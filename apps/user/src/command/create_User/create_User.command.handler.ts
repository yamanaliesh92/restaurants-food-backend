import { HttpService } from '@nestjs/axios';
import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AxiosError } from 'axios';
import { lastValueFrom } from 'rxjs';
import { URLSearchParams } from 'url';

import { UserDoa } from '../../db/doa/user.doa';
import { CreateUserEntityDto } from '../../db/dto/create-user.entity.dto';
import { UniqueConstraintViolationDataAccessException } from '../../db/errors/unique-constraint-violation.exception';

import { ModelMapperService } from '../../db/service/modelMapper.service';
import { AxiosErrorApplicationException } from '../../error/axios.application.exception';
import { UnKnowErrorApplicationException } from '../../error/unknow.error.application.exception';
import { UserAlreadyExistApplicationException } from '../../error/user.alreday.exist.application';
import { Bc } from '../../shared/bc.service';
import {
  IPayloadJwt as IPayloadJwt,
  JwtService,
} from '../../shared/jwt.service';
import { CreateUserCommand } from './create_User.command';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(
    private readonly userdoa: UserDoa,
    private readonly modelsMapper: ModelMapperService,
    private readonly bc: Bc,

    private readonly jwt: JwtService,
    private readonly http: HttpService,
  ) {}

  async execute(command: CreateUserCommand) {
    try {
      const fromDate = new URLSearchParams();
      const img = command.img;
      const email = command.email;
      const password = command.password;
      const username = command.username;
      fromDate.append('image', img);
      fromDate.append('email', email);
      fromDate.append('password', password);
      fromDate.append('username', username);

      const { data } = await lastValueFrom(
        this.http.post(
          `https://api.imgbb.com/1/upload?key=898ab0c193c3ec2c099ca0cf8d071ee8`,
          fromDate,
        ),
      );

      const model = new CreateUserEntityDto({
        img: data.data?.display_url,
        email: command.email,
        password: await this.bc.hashPassword(command.password),
        username: command.username,
      });

      const user = await this.userdoa.save(model);

      this.modelsMapper.modelToDto(user);

      const Payload: IPayloadJwt = {
        id: user.id,
      };

      const token = await this.jwt.sign(Payload);
      return { acceesToken: token };
    } catch (Err) {
      if (Err instanceof AxiosError) {
        Logger.log('error in axios ', { Err });
        throw new AxiosErrorApplicationException();
      }
      Logger.log('error in createUserCommandHandler', { Err });
      if (Err instanceof UniqueConstraintViolationDataAccessException) {
        throw new UserAlreadyExistApplicationException();
      }
      throw new UnKnowErrorApplicationException();
    }
  }
}
