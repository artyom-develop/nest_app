import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthUserService } from './auth.service';
import { RegisterRequest } from './dto/register.dto';
import { LoginRequest } from './dto/login.dto';
import { type Response, type Request } from 'express';
import {
  LoginSwagger,
  LogoutSwagger,
  RefreshSwagger,
  RegistrationSwagger,
} from '../../shared/decotators/api-swagger/auth.swagger';
import { AuthGuard } from '@nestjs/passport';
import { Authorization } from '../../shared/decotators/auth.decorator';
import { Authorized } from './decorators/authorized.decorator';
import { type User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthUserService) {}

  @RegistrationSwagger()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: RegisterRequest,
  ) {
    return this.authService.registerUser(res, dto);
  }

  @LoginSwagger()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Res({
      passthrough: true,
    })
    res: Response,
    @Body() dto: LoginRequest,
  ) {
    return this.authService.LoginUser(res, dto);
  }

  @RefreshSwagger()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Res({
      passthrough: true,
    })
    res: Response,
    @Req() req: Request,
  ) {
    return this.authService.refreshUser(req, res);
  }

  @LogoutSwagger()
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Res({
      passthrough: true,
    })
    res: Response,
    @Req() req: Request,
  ) {
    return await this.authService.logoutUser(res, req);
  }

  @Authorization()
  @Get('me')
  @HttpCode(HttpStatus.OK)
  async me(@Authorized('id') id: string) {
    return { id };
  }
  
}
