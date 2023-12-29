import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, FindOptionsWhere, Repository } from 'typeorm';
import { CreateEventEntityDto } from '../dto/createEventEntity.dto';

import { UpdateEventEntityDto } from '../dto/updateEventEntity.dto';

import { EventEntity } from '../entity/event.entity';
import { NotFoundDataAccessException } from '../error/notFoundError.access.exception';
import { UnKnowDataAccessException } from '../error/unKnowError.data.exception';
import { ModelMapperServiceEvent } from '../service/modelMapperEvent.service';

@Injectable()
export class EventDoa {
  private logger = new Logger(this.constructor.name, { timestamp: true });
  constructor(
    @InjectRepository(EventEntity)
    private readonly repo: Repository<EventEntity>,
    private readonly modelMapper: ModelMapperServiceEvent,
  ) {}

  async save(data: CreateEventEntityDto) {
    try {
      const model = new EventEntity({
        category: data.category,
        imgOrder: data.imgOrder,
        oldPrice: data.oldPrice,
        newPrice: data.newPrice,
        restaurantId: data.restaurantId,
        description: data.description,
        userId: data.userId,
        date: data.date,
        name: data.name,
      });

      const result = await this.repo.save(model);
      return this.modelMapper.toEvent(result);
    } catch (err) {
      throw new UnKnowDataAccessException(err);
    }
  }

  async findOne(where: FindOptionsWhere<EventEntity>) {
    try {
      const result = await this.repo.findOneOrFail({ where: where });
      return this.modelMapper.toEvent(result);
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundDataAccessException(err);
      }

      throw new UnKnowDataAccessException(err);
    }
  }

  async delete(id: number) {
    try {
      const result = await this.repo.delete(id);
      return result.affected > 0;
    } catch (err) {
      throw new UnKnowDataAccessException(err);
    }
  }

  async update(id: number, args: UpdateEventEntityDto) {
    try {
      const result = await this.repo.update(
        { id: id },
        {
          ...(args.category ? { category: args.category } : {}),
          ...(args.imgOrder ? { imgOrder: args.imgOrder } : {}),
          ...(args.name ? { name: args.name } : {}),
          ...(args.newPrice ? { newPrice: args.newPrice } : {}),
          ...(args.oldPrice ? { oldPrice: args.oldPrice } : {}),
          ...(args.date ? { date: args.date } : {}),
          ...(args.description ? { description: args.description } : {}),
        },
      );
      return result.affected > 0;
    } catch (err) {
      throw new UnKnowDataAccessException(err);
    }
  }

  async find(where?: FindOptionsWhere<EventEntity>) {
    try {
      const result = await this.repo.find({
        where: where,
      });

      return result.map(this.modelMapper.toEvent);
    } catch (err) {
      throw new UnKnowDataAccessException(err);
    }
  }
}
