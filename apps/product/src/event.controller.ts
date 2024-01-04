import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Logger,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { FileInterceptor } from '@nestjs/platform-express';

import { CreateEventCommand } from './command/create-event/create-event.commadn';
import { GetAllEventsQuery } from './query/get-all-event/get-all-event.query';
import { DeleteEventCommand } from './command/delete-event/delete-event.command';
import { UpdateEventCommand } from './command/update-event/update.event.command';
import { GetUserEventsQuery } from './query/get-user-events/get-user-events.query';
import { AxiosApplicationException } from './error/axios.application.exception';
import { UpdateImgEventCommand } from './command/update-img-event/update.img.event.command';
import { EventGuard } from './shared/event.guard';
import { CreateEventDto } from './dto/event/create-event.dto';
import { AuthGuard, IRequest } from 'y/lib/shared/auth.Guard';
import { DeleteEventDto } from './dto/event/delete-event.dto';
import { UpdateEventDto } from './dto/event/update-event.dto';
import { UpdateEventParamDto } from './dto/event/update-event-param.dto';

@Controller('api/events')
export class EventsController {
  readonly #logger = new Logger(this.constructor.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UseGuards(AuthGuard)
  @Get('all/event')
  async getAll() {
    try {
      const query = new GetAllEventsQuery({});

      return await this.queryBus.execute(query);
    } catch (err) {
      this.#logger.error(err);

      throw new InternalServerErrorException();
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
      const cmd = new UpdateImgEventCommand({
        id: id,
        imgOrder: img.buffer.toString('base64'),
      });

      return this.commandBus.execute(cmd);
    } catch (err) {
      this.#logger.error(err);

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
      const query = new GetUserEventsQuery({ userId: req.user.id });

      return await this.queryBus.execute(query);
    } catch (err) {
      this.#logger.error(err);

      throw new InternalServerErrorException();
    }
  }

  @UseGuards(AuthGuard, EventGuard)
  @Delete(':id')
  async delete(@Param() { id }: DeleteEventDto) {
    try {
      const cmd = new DeleteEventCommand({ id: id });

      return await this.commandBus.execute(cmd);
    } catch (err) {
      this.#logger.error(err);

      throw new InternalServerErrorException();
    }
  }

  @UseGuards(AuthGuard, EventGuard)
  @Patch(':id')
  async updateEvent(
    @Body() body: UpdateEventDto,
    @Param() { id }: UpdateEventParamDto,
  ) {
    try {
      const cmd = new UpdateEventCommand({
        id: id,
        date: body.date,
        category: body.category,
        description: body.description,
        name: body.name,
        newPrice: body.newPrice,
        oldPrice: body.oldPrice,
      });

      return await this.commandBus.execute(cmd);
    } catch (err) {
      this.#logger.error(err);

      throw new InternalServerErrorException();
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
      const cmd = new CreateEventCommand({
        name: body.name,
        restaurantId: body.restaurantId,
        imgOrder: img.buffer.toString('base64'),
        userId: user.user.id,
        description: body.description,
        category: body.category,
        date: body.date,
        newPrice: body.newPrice,
        oldPrice: body.oldPrice,
      });

      return await this.commandBus.execute(cmd);
    } catch (err) {
      this.#logger.error(err);

      if (err instanceof AxiosApplicationException) {
        throw new BadRequestException('Please choose an image below 3MB');
      }

      throw new InternalServerErrorException();
    }
  }
}
