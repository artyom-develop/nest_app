import { Module } from '@nestjs/common';
import { InvalidateTokenService } from './invalidate-token.service';

import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from '../../config/jwt.config';
import { ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { getRedisConfig } from '../../config/redis.config';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: getJwtConfig,
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      useFactory: getRedisConfig,
      inject: [ConfigService],
    }),
  ],
  providers: [InvalidateTokenService],
  exports: [InvalidateTokenService],
})
export class InvalidateTokenModule {}
