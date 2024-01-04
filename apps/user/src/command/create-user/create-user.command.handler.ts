import { HttpService } from '@nestjs/axios';
import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AxiosError } from 'axios';
import { Bc } from 'y/lib/shared/bc.service';
import { IPayloadJwt, Jwt } from 'y/lib/shared/jwt.service';

import { UserDoa } from '../../db/doa/user.doa';
import { CreateUserEntityDto } from '../../db/dto/create-user.entity.dto';
import { UniqueConstraintViolationDataAccessException } from '../../db/errors/unique-constraint-violation.exception';

import { ModelMapperService } from '../../db/service/modelMapper.service';
import { AxiosErrorApplicationException } from '../../error/axios.application.exception';
import { UnKnowErrorApplicationException } from '../../error/unknown.error.application.exception';
import { UserAlreadyExistApplicationException } from '../../error/user.already.exist.application';

import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(
    private readonly userdoa: UserDoa,
    private readonly modelsMapper: ModelMapperService,
    private readonly bc: Bc,

    private readonly jwt: Jwt,
  ) {}

  async execute(command: CreateUserCommand): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    try {
      const model = new CreateUserEntityDto({
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
      const refreshToken = await this.jwt.refreshToken(Payload);
      return { accessToken: token, refreshToken: refreshToken };
    } catch (Err) {
      Logger.log('error in createUserCommandHandler', { Err });
      if (Err instanceof UniqueConstraintViolationDataAccessException) {
        throw new UserAlreadyExistApplicationException();
      }
      throw new UnKnowErrorApplicationException();
    }
  }
}
