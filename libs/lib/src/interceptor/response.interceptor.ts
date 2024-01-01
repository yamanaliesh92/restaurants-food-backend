import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';

export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const res: Response = context.switchToHttp().getResponse();

    if (request['new_tokens']) {
      res.setHeader('new_token', request['new_tokens'].token);
      res.setHeader('new_refresh_token', request['new_tokens'].refreshToken);
    }

    return next.handle();
  }
}
