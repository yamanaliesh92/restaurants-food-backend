import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, FindOptionsWhere, Repository } from 'typeorm';
import { CreateOrderEntityDto } from '../dto/createOrder.entity.dto';
import { UpdateOrderEntityDto } from '../dto/updateOrder.entity.dto';
import { OrderEntity } from '../entity/order.entity';
import { NotFoundDataAccessException } from '../error/notFoundError.access.exception';
import { UnKnowDataAccessException } from '../error/unKnowError.data.exception';
import { ModelMapperServiceOrder } from '../service/modelMapperOrder.service';

@Injectable()
export class OrderDoa {
  private logger = new Logger(this.constructor.name, { timestamp: true });
  constructor(
    @InjectRepository(OrderEntity)
    private readonly repo: Repository<OrderEntity>,
    private readonly modelMapper: ModelMapperServiceOrder,
  ) {}

  async save(data: CreateOrderEntityDto) {
    try {
      const model = new OrderEntity({
        category: data.category,
        imgOrder: data.imgOrder,
        price: data.price,
        restaurantId: data.restaurantId,
        description: data.description,
        userId: data.userId,
        name: data.name,
      });

      const result = await this.repo.save(model);
      return this.modelMapper.toOrder(result);
    } catch (err) {
      throw new UnKnowDataAccessException(err);
    }
  }

  async findOne(where: FindOptionsWhere<OrderEntity>) {
    try {
      const result = await this.repo.findOneOrFail({ where: where });
      return this.modelMapper.toOrder(result);
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
      Logger.log('error ', { err });
      throw new UnKnowDataAccessException(err);
    }
  }

  async update(id: number, args: UpdateOrderEntityDto) {
    try {
      const result = await this.repo.update(
        { id: id },
        {
          ...(args.category ? { category: args.category } : {}),
          ...(args.imgOrder ? { imgOrder: args.imgOrder } : {}),
          ...(args.name ? { name: args.name } : {}),
          ...(args.price ? { price: args.price } : {}),
          ...(args.description ? { description: args.description } : {}),
        },
      );
      return result.affected > 0;
    } catch (err) {
      Logger.log('error ', { err });

      throw new UnKnowDataAccessException(err);
    }
  }

  async find(where?: FindOptionsWhere<OrderEntity>) {
    try {
      const result = await this.repo.find({
        where: where,
      });
      Logger.log('res', result);
      return result.map(this.modelMapper.toOrder);
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundDataAccessException(err);
      }
      throw new UnKnowDataAccessException(err);
    }
  }
}
