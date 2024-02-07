import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

import { CreateOrderCommand } from './command/create-order/create_order.command';
import { DeleteOrderCommand } from './command/delete_order/delete_order.command';
import { GetOrdersQuery } from './query/get-orders/get-orders.query';
import { GetOrdersQueryByUserId } from './query/get-user-orders/getAllOrdersByUserId.command';
import { GetOrderQuery } from './query/get-order/get-order.query';
import { UpdateImgOrderCommand } from './command/update-imgOrder/update.imgOrder.command';
import { UpdateOrderCommand } from './command/update_order/update-order.command';

import { GetOrdersByCategoryQuery } from './query/get-order-by-category/get-order-by-category.query';
import { NotFoundApplicationException } from './error/record-not-found.application.exception';
import { AxiosApplicationException } from './error/axios.application.exception';
import { UpdateOrderDto } from './dto/order/update.order.dto';
import { CreateOrderDto } from './dto/order/create.order.dto';
import { OrderGuard } from './shared/order.guard';
import { AuthGuard, IRequest } from 'y/lib/shared/auth.Guard';
import { IdParamDto } from './dto/common/id-param.dto';

@Controller('api/orders')
export class OrdersController {
  readonly #logger = new Logger(this.constructor.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  async getOne(@Param() { id }: GetOrderQuery) {
    try {
      const query = new GetOrderQuery({ id });

      return await this.queryBus.execute(query);
    } catch (err) {
      if (err instanceof NotFoundApplicationException) {
        throw new NotFoundException();
      }

      throw new InternalServerErrorException();
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async getByCategory(@Query('category') category: string) {
    try {
      const query = new GetOrdersByCategoryQuery({
        category: category,
      });

      return this.queryBus.execute(query);
    } catch (err) {
      throw new InternalServerErrorException('some thing went wrong try again');
    }
  }

  @UseGuards(AuthGuard)
  @Get('all/orders')
  async getAll() {
    try {
      const query = new GetOrdersQuery({});

      return await this.queryBus.execute(query);
    } catch (err) {
      throw new InternalServerErrorException('some thing went wrong try again');
    }
  }

  @Delete(':id')
  async delete(@Param() { id }: IdParamDto) {
    try {
      const cmd = new DeleteOrderCommand({ id: id });

      return this.commandBus.execute(cmd);
    } catch (err) {
      throw new InternalServerErrorException('some thing went wrong try again');
    }
  }

  @UseGuards(AuthGuard, OrderGuard)
  @Patch(':id')
  updateOrder(@Body() body: UpdateOrderDto, @Param() { id }: IdParamDto) {
    try {
      const cmd = new UpdateOrderCommand({
        id: id,
        name: body.name,
        price: body.price,
        category: body.category,
        description: body.description,
      });

      return this.commandBus.execute(cmd);
    } catch (err) {
      throw new InternalServerErrorException('some thing went wrong try again');
    }
  }

  @UseGuards(AuthGuard)
  @Patch('updateImg/:id')
  @UseInterceptors(FileInterceptor('imgOrder'))
  updateImgOrder(
    @Param() { id }: IdParamDto,
    @UploadedFile() img: Express.Multer.File,
  ) {
    try {
      const cmd = new UpdateImgOrderCommand({
        id: id,
        imgOrder: img.buffer.toString('base64'),
      });

      return this.commandBus.execute(cmd);
    } catch (err) {
      if (err instanceof AxiosApplicationException) {
        throw new BadRequestException(
          'some thing went wrong in upload img order try again...',
        );
      }
      throw new InternalServerErrorException('some thing went wrong try again');
    }
  }

  @UseGuards(AuthGuard)
  @Get('all/userId')
  async getAllOrder(@Req() user: IRequest) {
    try {
      const query = new GetOrdersQueryByUserId({ userId: user.user.id });

      return await this.queryBus.execute(query);
    } catch (err) {
      throw new InternalServerErrorException('some thing went wrong try again');
    }
  }

  @UseGuards(AuthGuard)
  @Post('create')
  @UseInterceptors(FileInterceptor('imgOrder'))
  async createOrder(
    @Body() body: CreateOrderDto,
    @UploadedFile() img: Express.Multer.File,
    @Req() user: IRequest,
  ) {
    try {
      const cmd = new CreateOrderCommand({
        name: body.name,
        restaurantId: body.restaurantId,
        imgOrder: img.buffer.toString('base64'),
        userId: user.user.id,
        description: body.description,
        category: body.category,
        price: body.price,
      });

      return await this.commandBus.execute(cmd);
    } catch (error) {
      this.#logger.error('Error during creating order', error);

      if (error instanceof AxiosApplicationException) {
        throw new BadRequestException(
          'some thing went wrong in upload img order try again...',
        );
      }
      throw new InternalServerErrorException(
        'some thing went wrong please try again....',
      );
    }
  }
}
