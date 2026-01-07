import {
  ConflictException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import argon2 from 'argon2';
import { PrismaService } from '../../core/services/prisma/prisma.service';

import e, { type Request, type Response } from 'express';

import { AuthService } from '../../core/services/auth/auth.service';
import { RegisterRequest } from './inputs/regester.input';
import { LoginRequest } from './inputs/login.input';

@Injectable()
export class AuthGraphqlService {
  constructor(
    private prismaService: PrismaService,
    private authService: AuthService,
  ) {}

  async registerUser(res: Response, input: RegisterRequest) {
    const { name, email, password } = input;

    const existUser = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (existUser) {
      throw new ConflictException('User already exists');
    }

    const newUser = await this.prismaService.user.create({
      data: {
        name,
        email,
        password: await argon2.hash(password),
      },
    });
    const { accessToken } = await this.authService.auth(res, newUser.id);
    const response = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      accessToken,
    };
    return response;
  }

  async LoginUser(res: Response, input: LoginRequest) {
    const { email, password } = input;

    const existUser = await this.prismaService.user.findUnique({
      where: { email },
      select: {
        id: true,
        password: true,
        name: true,
        email: true,
      },
    });

    if (!existUser) {
      throw new NotFoundException('Uncorrect email or password');
    }

    const isValidPassword = await argon2.verify(existUser.password!, password);
    // для того чтобы злоумышлиники не понимали неправильно они подобрали почту или пароль
    if (!isValidPassword) {
      throw new NotFoundException('Uncorrect email or password');
    }

    const { accessToken } = await this.authService.auth(res, existUser.id);

    const response = {
      id: existUser.id,
      name: existUser.name,
      email: existUser.email,
      accessToken,
    };
    return response;
  }
  async refreshUser(req: Request, res: Response) {
    const payload = await this.authService.verifyToken(req);
    if (payload) {
      const user = await this.prismaService.user.findUnique({
        where: { id: payload.id },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      if (!user) {
        throw new NotFoundException('Not found user');
      }
      return await this.authService.auth(res, user.id);
    }
  }

  async logoutUser(req: Request, res: Response) {
    await this.authService.logout(res, req);
    return { message: 'Logout successful', error: false };
  }

 
}
