import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ResponseInterceptor } from 'y/lib/interceptor/response.interceptor';
import { ProductModule } from './product.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductModule);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(7000);
  Logger.log('prot', 7000);
}
bootstrap();
