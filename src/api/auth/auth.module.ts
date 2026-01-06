import { Module } from '@nestjs/common';
import { AuthUserService } from './auth.service';
import { AuthController } from './auth.controller';

import { AuthModule } from '../../core/services/auth/auth.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [AuthModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthUserService, JwtStrategy],
})
export class AuthUserModule {}
