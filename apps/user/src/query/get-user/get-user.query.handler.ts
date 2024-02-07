import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserDoa } from '../../db/doa/user.doa';
import { UserDto } from '../../db/dto/user.dto';
import { RecordNotFoundDataAccessException } from '../../db/errors/record-not-found.exception';
import { ModelMapperService } from '../../db/service/modelMapper.service';
import { UnKnowErrorApplicationException } from '../../error/unknown.error.application.exception';
import { UserNotFoundApplicationException } from '../../error/user-not-found.application.exception';

import { GetUserQuery } from './get-user.query';

@QueryHandler(GetUserQuery)
export class GetOneUserQueryHandler implements IQueryHandler<GetUserQuery> {
  constructor(
    private readonly userDao: UserDoa,
    private readonly model: ModelMapperService,
  ) {}

  async execute(command: GetUserQuery): Promise<UserDto> {
    try {
      const result = await this.userDao.findOne({ id: command.id });

      return this.model.modelToDto(result);
    } catch (err) {
      if (err instanceof RecordNotFoundDataAccessException) {
        throw new UserNotFoundApplicationException();
      }
      throw new UnKnowErrorApplicationException();
    }
  }
}
