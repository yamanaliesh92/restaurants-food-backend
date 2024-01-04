import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  EntityNotFoundError,
  FindOptionsWhere,
  QueryFailedError,
  Repository,
} from 'typeorm';
import { CreateUserEntityDto } from '../dto/create-user.entity.dto';
import { UpdateUserEntityDto } from '../dto/update-user.entity.dto';
import { TypeORMErrorCodes } from '../errors/error-codes.typeorm';
import { UnexpectedDataAccessException } from '../errors/unexpected-data-access.exception';
import { UniqueConstraintViolationDataAccessException } from '../errors/unique-constraint-violation.exception';
import { ModelMapperService } from '../service/modelMapper.service';
import { UserEntity } from '../entity/user.entity';
import { RecordNotFoundDataAccessException } from '../errors/record-not-found.exception';

@Injectable()
export class UserDoa {
  private logger = new Logger(this.constructor.name, { timestamp: true });
  constructor(
    @InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>,
    private readonly modelMapper: ModelMapperService,
  ) {}

  async save(data: CreateUserEntityDto) {
    try {
      const model = new UserEntity({
        email: data.email,
        password: data.password,
        username: data.username,
      });
      const result = await this.repo.save(model);
      return this.modelMapper.toUser(result);
    } catch (err) {
      Logger.log('err', err);
      if (
        err instanceof QueryFailedError &&
        err.driverError?.code === TypeORMErrorCodes.UNIQUE_CONSTRAINT_VIOLATION
      ) {
        throw new UniqueConstraintViolationDataAccessException(err);
      }
      throw new UnexpectedDataAccessException(err);
    }
  }

  async findOne(where: FindOptionsWhere<UserEntity>) {
    try {
      const result = await this.repo.findOneOrFail({ where: where });
      return this.modelMapper.toUser(result);
    } catch (err) {
      Logger.log('error ', { err });
      if (err instanceof EntityNotFoundError) {
        throw new RecordNotFoundDataAccessException(err);
      }
      throw new UnexpectedDataAccessException(err);
    }
  }

  async update(id: number, args: UpdateUserEntityDto) {
    try {
      const result = await this.repo.update(id, {
        ...(args.username ? { username: args.username } : {}),

        ...(args.password ? { password: args.password } : {}),
      });
      return result.affected > 0;
    } catch (err) {
      Logger.log('error ', { err });

      throw new UnexpectedDataAccessException(err);
    }
  }

  async find(where?: FindOptionsWhere<UserEntity>) {
    try {
      return await this.repo.find({
        where: where,
      });
    } catch (err) {
      Logger.log('error ', { err });
      if (err instanceof EntityNotFoundError) {
        throw new RecordNotFoundDataAccessException(err);
      }
      throw new UnexpectedDataAccessException(err);
    }
  }
}
