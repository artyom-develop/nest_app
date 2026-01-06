import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { type Request, type Response } from 'express';
import { type JwtPayLoad } from '../../../api/auth/interfaces/jwt.interface';
import { convertDurationToDate } from '../../../utils/convert-date.util';
import { CookieService } from '../cookie/cookie.service';
import { PrismaService } from '../prisma/prisma.service';
import { parseDurationToSeconds } from '../../../utils/parse-duration';
import { InvalidateTokenService } from '../invalidate-token/invalidate-token.service';

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_TTL: string;
  private readonly JWT_REFRESH_TOKEN_TTL: string;
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private cookieService: CookieService,
    private invalidateTokenService: InvalidateTokenService,
  ) {
    this.JWT_ACCESS_TOKEN_TTL = this.configService.getOrThrow<string>(
      'JWT_ACCESS_TOKEN_TTL',
    );
    this.JWT_REFRESH_TOKEN_TTL = this.configService.getOrThrow<string>(
      'JWT_REFRESH_TOKEN_TTL',
    );
  }

  private async generateTokens(id: string) {
    const payLoad: JwtPayLoad = {
      id,
    };
    const accessToken = this.jwtService.sign(payLoad, {
      expiresIn: parseDurationToSeconds(this.JWT_ACCESS_TOKEN_TTL),
    });
    const refreshToken = this.jwtService.sign(payLoad, {
      expiresIn: parseDurationToSeconds(this.JWT_REFRESH_TOKEN_TTL),
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async auth(res: Response, id: string) {
    const { accessToken, refreshToken } = await this.generateTokens(id);
    this.cookieService.setCookie(
      res,
      refreshToken,
      convertDurationToDate(this.JWT_REFRESH_TOKEN_TTL),
    );
    return { accessToken };
  }
  async verifyToken(req: Request) {
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken) {
      throw new UnauthorizedException('Unauthorized error');
    }
    if (await this.invalidateTokenService.isTokenInvalidated(refreshToken)) {
      throw new UnauthorizedException('Token invalidated');
    }
    const payload: JwtPayLoad =
      await this.jwtService.verifyAsync<JwtPayLoad>(refreshToken);
    if (!payload) {
      throw new UnauthorizedException('Unauthorized error');
    }
    return payload;
  }

  async logout(res: Response, req: Request) {
    const refreshToken = req?.cookies['refreshToken']
      ? req.cookies['refreshToken']
      : null;

    if (refreshToken) {
      await this.invalidateTokenService.invalidateToken(refreshToken);
    }
    this.cookieService.removeCookie(res);
  }

  
}
