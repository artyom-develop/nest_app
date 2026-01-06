import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/auth.guard';

export const Authorization = () => applyDecorators(UseGuards(JwtAuthGuard));
