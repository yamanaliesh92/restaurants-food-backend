import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetOneEventQuery } from '../query/get-one-event/get-one.event.query';

@Injectable()
export class EventGuard {
  constructor(private readonly queryBus: QueryBus) {}

  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();
      const id = request.params.id;
      const userId = request.user.id;
      const result = await this.queryBus.execute(
        new GetOneEventQuery({ id: id }),
      );

      if (result.userId !== userId) {
        return false;
      }

      return true;
    } catch (err) {
      return false;
    }
  }
}
