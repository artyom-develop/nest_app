import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { StringToLowercasePipe } from './shared/pipes/stringToLowercase.pipe';

@Controller('app')
export class AppController {
  @UsePipes(StringToLowercasePipe)
  @Post()
  create(@Body('title') title: string) {
    return `Movie ${title}`;
  }
}
