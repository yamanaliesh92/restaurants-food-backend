import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { AuthGuard, IRequest } from 'y/lib/shared/auth.Guard';
import { CreateRestaurantCommand } from './command/create-restaurant/create-restaurant.command';
import { GetAllRestaurantQuery } from './query/get-restaurant/get-restaurant.query';
import { GetOneRestaurantQuery } from './query/get-one-restaurant/get-one-restaurant.query';
import { UpdateRestaurantInfoCommand } from './command/update-restaurant/update.restaurant.info.command';
import { CreateRestaurantDto } from './dto/restaurant/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/restaurant/update-restaurant.dto';
import { NotFoundApplicationException } from './error/record-not-found.application.exception';

@Controller('api/restaurants')
export class ResController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: number) {
    try {
      const query = new GetOneRestaurantQuery({
        id: id,
      });

      return await this.queryBus.execute(query);
    } catch (err) {
      if (err instanceof NotFoundApplicationException) {
        throw new NotFoundException();
      }

      throw new InternalServerErrorException();
    }
  }

  @UseGuards(AuthGuard)
  @Get('all/restaurants')
  async getAll() {
    try {
      const query = new GetAllRestaurantQuery();

      return this.queryBus.execute(query);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  @UseGuards(AuthGuard)
  @Patch('update/:id')
  async updateRestaurant(
    @Body() body: UpdateRestaurantDto,
    @Param('id') id: number,
  ) {
    try {
      const cmd = new UpdateRestaurantInfoCommand({
        name: body.name,
        address: body.address,
        id: id,
      });

      return this.commandBus.execute(cmd);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  @UseGuards(AuthGuard)
  @Post('create')
  async createRestaurant(
    @Body() body: CreateRestaurantDto,
    @Req() req: IRequest,
  ) {
    try {
      const cmd = new CreateRestaurantCommand({
        name: body.name,
        address: body.address,
        userId: req.user.id,
      });

      return this.commandBus.execute(cmd);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
