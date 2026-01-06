import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './core/services/prisma/prisma.module';

import { AuthUserModule } from './api/auth/auth.module';
import { AuthModule } from './core/services/auth/auth.module';
import { InvalidateTokenModule } from './core/services/invalidate-token/invalidate-token.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),

    PrismaModule,
    AuthModule,
    AuthUserModule,
    InvalidateTokenModule,
  ],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
