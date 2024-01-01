import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AuthGuard, IRequest } from 'y/lib/shared/auth.Guard';
import { CreateRestaurantCommand } from './command/create-resturant/create-resturant.command';
import { GetAllRestaurantCommand } from './command/get-allResturant/get-allResturant.command';
import { GetOneRestaurantCommand } from './command/get-one-restaurant/get-one-restaurant.command';
import { UpdateRestaurantInfoCommand } from './command/update-resturant/update.resturant.info.command';
import { CreateRestaurantDto } from './dto/resturant/create.resturant.dto';
import { UpdateRestaurantDto } from './dto/resturant/update.restaurant.dto';
import { NotFoundApplicationException } from './error/notFound.appliaction.exception';

@Controller('api/restaurants')
export class ResController {
  constructor(
    private readonly commandbus: CommandBus, // @Inject('AUTH_MICROSERVICE') private readonly client: ClientKafka,
  ) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: number) {
    try {
      return this.commandbus.execute(
        new GetOneRestaurantCommand({
          id: id,
        }),
      );
    } catch (err) {
      if (err instanceof NotFoundApplicationException) {
        throw new BadRequestException('not found ');
      }
      throw new InternalServerErrorException(
        'some thing went wrong try again...',
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get('all/restaurants')
  async getAll() {
    try {
      return this.commandbus.execute(new GetAllRestaurantCommand());
    } catch (err) {
      throw new InternalServerErrorException(
        'some thing went wrong try again...',
      );
    }
  }

  @UseGuards(AuthGuard)
  @Patch('update/:id')
  async updateRestaurant(
    @Body() body: UpdateRestaurantDto,
    @Param('id') id: number,
  ) {
    Logger.log('hell');
    try {
      return this.commandbus.execute(
        new UpdateRestaurantInfoCommand({
          name: body.name,
          address: body.address,
          id: id,
        }),
      );
    } catch (err) {
      throw new InternalServerErrorException(
        'some thing went wrong try again...',
      );
    }
  }

  @UseGuards(AuthGuard)
  @Post('create')
  async createRestaurant(
    @Body() body: CreateRestaurantDto,
    @Req() req: IRequest,
  ) {
    try {
      return this.commandbus.execute(
        new CreateRestaurantCommand({
          name: body.name,
          address: body.address,
          userId: req.user.id,
        }),
      );
    } catch (err) {
      throw new InternalServerErrorException(
        'some thing went wrong try again...',
      );
    }
  }
}
