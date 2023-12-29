import {
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserDoa } from '../../db/doa/user.doa';
import { RecordNotFoundDataAccessException } from '../../db/errors/record-not-found.exception';
import { ModelMapperService } from '../../db/service/modelMapper.service';
import { UnKnowErrorApplicationException } from '../../error/unknow.error.application.exception';
import { UserNotFoundApplicationException } from '../../error/user-not-found.apllication.exception';
import { Bc } from '../../shared/bc.service';
import { IPayloadJwt, JwtService } from '../../shared/jwt.service';
import { LoginCommand } from './login.coomand';

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand> {
  constructor(
    private readonly userdoa: UserDoa,
    private readonly bc: Bc,
    private readonly modelMapper: ModelMapperService,
    private readonly jwt: JwtService,
  ) {}

  async execute(command: LoginCommand): Promise<any> {
    try {
      const user = await this.userdoa.findOne({ email: command.email });

      const correctPassword = await this.bc.comparePassword(
        user.password,
        command.password,
      );

      if (!correctPassword) {
        Logger.log('correct password', { correctPassword });
        throw new InternalServerErrorException(
          'email or password is not correct try again',
        );
      }

      const payload: IPayloadJwt = {
        id: user.id,
      };
      const token = await this.jwt.sign(payload);
      return { acceesToken: token };
    } catch (err) {
      Logger.log('error occurder in LoginCommandHandler', { err });
      if (err instanceof RecordNotFoundDataAccessException) {
        throw new UserNotFoundApplicationException();
      }
      throw new UnKnowErrorApplicationException();
    }
  }
}
