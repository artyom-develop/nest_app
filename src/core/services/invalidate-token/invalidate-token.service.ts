import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { type Cache } from 'cache-manager';

@Injectable()
export class InvalidateTokenService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private jwtService: JwtService,
  ) {}

  async invalidateToken(token: string) {
    const decoded = this.jwtService.decode(token);
    if (decoded?.exp) {
      const ttl = decoded.exp - Math.floor(Date.now() / 1000);
      if (ttl > 0) {
        await this.cacheManager.set(token, 'invalid', ttl);
      }
    }
  }

  async isTokenInvalidated(token: string): Promise<boolean> {
    const result = await this.cacheManager.get(token);

    return result === 'invalid';
  }
}
