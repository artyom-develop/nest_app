import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingMiddleware } from './shared/middlewares/logger.middleware';
import { ResponseInterceptor } from './core/interceptors/repsponse.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.setGlobalPrefix('api');
  await app.listen(3000);
}

bootstrap();
