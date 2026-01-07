import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PrismaModule } from './core/services/prisma/prisma.module';

import { AuthUserModule } from './api/auth/auth.module';
import { AuthModule } from './core/services/auth/auth.module';
import { InvalidateTokenModule } from './core/services/invalidate-token/invalidate-token.module';
import { GraphQLModule } from '@nestjs/graphql';
import { getGraphqlConfig } from './core/config/graphql.config';
import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo';
import { AuthGraphqlModule } from './api/auth-graphql/auth-graphql.module';
import { UserModule } from './api/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [ConfigModule],
      driver: ApolloDriver,
      useFactory: getGraphqlConfig,
      inject: [ConfigService],
    }),
    PrismaModule,
    AuthModule,
    AuthUserModule,
    InvalidateTokenModule,
    AuthGraphqlModule,
    UserModule,
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
