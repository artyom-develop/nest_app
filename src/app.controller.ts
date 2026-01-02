import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { StringToLowercasePipe } from './shared/pipes/stringToLowercase.pipe';
import { AuthGuard } from './shared/guards/auth.guard'

@Controller('app')
export class AppController {
  @UsePipes(StringToLowercasePipe)
  @Post()
  create(@Body('title') title: string) {
    return `Movie ${title}`;
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(){
    return {
      id: 1,
      email: 'artem1234@mail.ru',
      userName: 'artyom_dev',
    }
  }
}
