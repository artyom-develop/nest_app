import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from './api/movie/movie.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReviewModule } from './api/review/review.module';
import { ActorModule } from './api/actor/actor.module';
import { PrismaModule } from './core/prisma/prisma.module';
import { LoggingMiddleware } from './shared/middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    PrismaModule,

    MovieModule,
    ReviewModule,
    ActorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes({ path: 'movies', method: RequestMethod.GET });
  }
}
