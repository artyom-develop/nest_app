import { ConfigService } from '@nestjs/config';
import { isDev } from '../../../utils/is-dev.util';
import { type Response } from 'express';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CookieService {
  private readonly COOKIE_DOMAIN: string;
  constructor(private configService: ConfigService) {
    this.COOKIE_DOMAIN = this.configService.getOrThrow<string>('COOKIE_DOMAIN');
  }

  setCookie(res: Response, value: string, expires: Date) {
    res.cookie('refreshToken', value, {
      httpOnly: true,
      domain: this.COOKIE_DOMAIN,
      expires,
      secure: !isDev(this.configService),
      sameSite: isDev(this.configService) ? 'none' : 'lax',
    });
  }

  removeCookie(res: Response) {
    this.setCookie(res, 'refreshToken', new Date(0));
  }
}
