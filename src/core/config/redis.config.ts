import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet'; // Замените импорт

export const getRedisConfig = (configService: ConfigService) => ({
  store: redisStore,
  host: configService.getOrThrow<string>('REDIS_HOST', 'localhost'),
  port: configService.getOrThrow<number>('REDIS_PORT', 6379),
  ttl: 0,
});
