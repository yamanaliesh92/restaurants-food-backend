import { UserModule } from './user.module';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(UserModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
  Logger.log('app', 3000);
}
bootstrap();
