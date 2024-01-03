import { UserModule } from './user.module';
import { NestFactory } from '@nestjs/core';

import { Logger, ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from 'y/lib/interceptor/response.interceptor';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(UserModule);

  app.useGlobalInterceptors(new ResponseInterceptor());

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
  Logger.log('app', 3000);
}
bootstrap();
