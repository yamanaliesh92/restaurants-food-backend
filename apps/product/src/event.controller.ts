import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { FileInterceptor } from '@nestjs/platform-express';

import { CreateEventCommand } from './command/create-event/create-event.commadn';
import { GetAllEventCommand } from './command/get-all-event/get-all-event.command';
import { DeleteEventCommand } from './command/delete-event/delete-event.command';
import { UpdateEventCommand } from './command/update-event/update.event.command';
import { GetAllEventsCommandByUserId } from './command/get-my-all-event/get.my.all.event.command';
import { AxiosApplicationException } from './error/axios.applaction.exception';
import { UpdateImgEventCommand } from './command/update-img-event/update.img.event.command';
import { EventGuard } from './shared/event.guard';
import { CreateEventDto } from './dto/event/create-event.dto';
import { AuthGuard, IRequest } from 'y/lib/shared/auth.Guard';

@Controller('api/events')
export class EventsController {
  constructor(private readonly commandbus: CommandBus) {}

  @UseGuards(AuthGuard)
  @Get('all/event')
  async getAll() {
    try {
      return await this.commandbus.execute(new GetAllEventCommand({}));
    } catch (err) {
      throw new InternalServerErrorException(
        'some thing went wrong try again...',
      );
    }
  }

  @UseGuards(AuthGuard, EventGuard)
  @Patch('updateImg/:id')
  @UseInterceptors(FileInterceptor('imgOrder'))
  updateImgEvent(
    @Param('id') id: number,
    @UploadedFile() img: Express.Multer.File,
  ) {
    try {
      return this.commandbus.execute(
        new UpdateImgEventCommand({
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
  @Get()
  async getAllByUserId(@Req() req: IRequest) {
    try {
      return await this.commandbus.execute(
        new GetAllEventsCommandByUserId({ userId: req.user.id }),
      );
    } catch (err) {
      throw new InternalServerErrorException(
        'some thing went wrong try again...',
      );
    }
  }

  @UseGuards(AuthGuard, EventGuard)
  @Delete(':id')
  async delete(@Param() { id }: DeleteEventCommand) {
    try {
      return await this.commandbus.execute(new DeleteEventCommand({ id: id }));
    } catch (err) {
      throw new InternalServerErrorException(
        'some thing went wrong try again...',
      );
    }
  }

  @UseGuards(AuthGuard, EventGuard)
  @Patch(':id')
  async updateEvent(
    @Body() body: UpdateEventCommand,
    @Param() { id }: UpdateEventCommand,
  ) {
    try {
      return await this.commandbus.execute(
        new UpdateEventCommand({
          id: id,
          date: body.date,
          category: body.category,
          description: body.description,
          name: body.name,
          newPrice: body.newPrice,
          oldPrice: body.oldPrice,
        }),
      );
    } catch (err) {
      throw new InternalServerErrorException(
        'some thing went wrong try again...',
      );
    }
  }
  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('imgOrder'))
  async createOrder(
    @Body() body: CreateEventDto,
    @UploadedFile() img: Express.Multer.File,
    @Req() user: IRequest,
  ) {
    try {
      return await this.commandbus.execute(
        new CreateEventCommand({
          name: body.name,
          restaurantId: body.restaurantId,
          imgOrder: img.buffer.toString('base64'),
          userId: user.user.id,
          description: body.description,
          category: body.category,
          date: body.date,
          newPrice: body.newPrice,
          oldPrice: body.oldPrice,
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
