import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  EntityNotFoundError,
  FindOptionsWhere,
  QueryFailedError,
  Repository,
} from 'typeorm';
import { CreateRestaurantEntityDto } from '../dto/createResturant.entity.dto';
import { UpdateRestaurantEntityDto } from '../dto/updateResturant.entity.dto';
import { OrderEntity } from '../entity/order.entity';
import { RestaurantEntity } from '../entity/restaurant.entity';
import { NotFoundDataAccessException } from '../error/notFoundError.access.exception';
import { UnKnowDataAccessException } from '../error/unKnowError.data.exception';
import { ModelMapperServiceRestaurant } from '../service/modelMapper.resturant.service';

@Injectable()
export class RestaurantDoa {
  private logger = new Logger(this.constructor.name, { timestamp: true });
  constructor(
    @InjectRepository(RestaurantEntity)
    private readonly repo: Repository<RestaurantEntity>,
    private readonly modelMapper: ModelMapperServiceRestaurant,
  ) {}

  async save(data: CreateRestaurantEntityDto) {
    try {
      const model = new RestaurantEntity({
        address: data.address,
        userId: data.userId,
        name: data.name,
      });

      const result = await this.repo.save(model);
      return this.modelMapper.toRestaurant(result);
    } catch (err) {
      throw new UnKnowDataAccessException(err);
    }
  }

  async findOne(where: FindOptionsWhere<RestaurantEntity>) {
    try {
      return await this.repo.findOneOrFail({
        where: where,
        relations: { orders: true, events: true },
      });

      // return this.modelMapper.toRestaurant(result);
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundDataAccessException(err);
      }
      throw new UnKnowDataAccessException(err);
    }
  }

  async update(id: number, args: UpdateRestaurantEntityDto) {
    try {
      const result = await this.repo.update(
        { id: id },
        {
          ...(args.address ? { address: args.address } : {}),

          ...(args.name ? { name: args.name } : {}),
        },
      );
      return result.affected > 0;
    } catch (err) {
      throw new UnKnowDataAccessException(err);
    }
  }

  async find(where?: FindOptionsWhere<OrderEntity>) {
    try {
      const result = await this.repo.find({
        where: where,
      });
      return result.map(this.modelMapper.toRestaurant);
    } catch (err) {
      throw new UnKnowDataAccessException(err);
    }
  }
}
