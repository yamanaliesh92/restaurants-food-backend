import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GetOneEventCommand } from '../command/get-one-event/get-one.event.command';

@Injectable()
export class EventGuard {
  constructor(private readonly commandBus: CommandBus) {}

  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();
      const id = request.params.id;
      const userId = request.user.id;
      const b = await this.commandBus.execute(
        new GetOneEventCommand({ id: id }),
      );

      if (b.userId !== userId) {
        return false;
      }

      return true;
    } catch (err) {
      Logger.error('Unknown error in guard', { err });
      return false;
    }
  }
}