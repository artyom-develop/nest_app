import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../../config/jwt.config';
import { CookieService } from '../cookie/cookie.service';
import { InvalidateTokenModule } from '../invalidate-token/invalidate-token.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: getJwtConfig,
      inject: [ConfigService],
    }),
    InvalidateTokenModule,
  ],
  providers: [AuthService, CookieService],
  exports: [AuthService],
})
export class AuthModule {}
