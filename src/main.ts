import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingMiddleware } from './shared/middlewares/logger.middleware';
import { ResponseInterceptor } from './core/interceptors/repsponse.interceptor';
import { AllExceptionFilter } from './shared/filters/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionFilter());
  app.setGlobalPrefix('api');
  await app.listen(3000);
}

bootstrap();
