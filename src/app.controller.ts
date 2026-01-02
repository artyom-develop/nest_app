import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { StringToLowercasePipe } from './shared/pipes/stringToLowercase.pipe';
import { AuthGuard } from './shared/guards/auth.guard';
import { UserAgent } from './shared/decotators/user-agent.decorator';
import { ResponseInterceptor } from './core/interceptors/repsponse.interceptor';

@Controller('app')
export class AppController {
  @UsePipes(StringToLowercasePipe)
  @Post()
  create(@Body('title') title: string) {
    return `Movie ${title}`;
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@UserAgent() userAgent: string) {
    return {
      id: 1,
      email: 'artem1234@mail.ru',
      userName: 'artyom_dev',
      userAgent: userAgent,
    };
  }
}
