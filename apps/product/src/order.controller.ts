import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  InternalServerErrorException,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';

import { CreateOrderCommand } from './command/create_order/create_order.command';
import { DeleteOrderCommand } from './command/delete_order/delete_order.command';
import { GetAllOrderCommand } from './command/get_AllOrders/get_AllOrder.command';
import { GetAllOrderCommandByUserId } from './command/get_allOrderByUserId/getAllOrdersByUserId.command';
import { GetOneOrderCommand } from './command/get_one_order/get_one_order.command';
import { UpdateImgOrderCommand } from './command/update-imgOrder/update.imgOrder.command';
import { UpdateOrderCommand } from './command/update_order/upadte_order.command';

import { GetAllOrderByCategoryCommand } from './command/get-allOrderByCategory/get-allOrderByCategory.command';
import { NotFoundApplicationException } from './error/notFound.appliaction.exception';
import { AxiosApplicationException } from './error/axios.applaction.exception';
import { UpdateOrderDto } from './dto/order/update.order.dto';
import { CreateOrderDto } from './dto/order/create.order.dto';
import { OrderGuard } from './shared/order.guard';
import { AuthGuard, IRequest } from 'y/lib/shared/auth.Guard';

@Controller('api/orders')
export class OrdersController {
  constructor(private readonly commandbus: CommandBus) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  async getOne(@Param() { id }: GetOneOrderCommand) {
    try {
      return await this.commandbus.execute(
        new GetOneOrderCommand({
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
  @Get()
  async getByCategory(@Query('category') category: string) {
    try {
      return this.commandbus.execute(
        new GetAllOrderByCategoryCommand({
          category: category,
        }),
      );
    } catch (err) {
      throw new InternalServerErrorException('some thing went wrong try again');
    }
  }

  @UseGuards(AuthGuard)
  @Get('all/orders')
  async getAll() {
    try {
      return await this.commandbus.execute(new GetAllOrderCommand({}));
    } catch (err) {
      throw new InternalServerErrorException('some thing went wrong try again');
    }
  }

  @Delete(':id')
  async delete(@Param() { id }: DeleteOrderCommand) {
    try {
      return this.commandbus.execute(new DeleteOrderCommand({ id: id }));
    } catch (err) {
      throw new InternalServerErrorException('some thing went wrong try again');
    }
  }

  @UseGuards(AuthGuard, OrderGuard)
  @Patch(':id')
  updateOrder(
    @Body() body: UpdateOrderDto,
    @Param() { id }: UpdateOrderCommand,
  ) {
    try {
      return this.commandbus.execute(
        new UpdateOrderCommand({
          id: id,
          name: body.name,
          price: body.price,
          category: body.category,
          description: body.description,
        }),
      );
    } catch (err) {
      throw new InternalServerErrorException('some thing went wrong try again');
    }
  }

  @UseGuards(AuthGuard)
  @Patch('updateImg/:id')
  @UseInterceptors(FileInterceptor('imgOrder'))
  updateImgOrder(
    @Param('id') id: number,
    @UploadedFile() img: Express.Multer.File,
  ) {
    try {
      return this.commandbus.execute(
        new UpdateImgOrderCommand({
          id: id,
          imgOrder: img.buffer.toString('base64'),
        }),
      );
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
      return this.commandbus.execute(
        new GetAllOrderCommandByUserId({ userId: user.user.id }),
      );
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
      return await this.commandbus.execute(
        new CreateOrderCommand({
          name: body.name,
          restaurantId: body.restaurantId,
          imgOrder: img.buffer.toString('base64'),
          userId: user.user.id,
          description: body.description,
          category: body.category,
          price: body.price,
        }),
      );
    } catch (error) {
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
