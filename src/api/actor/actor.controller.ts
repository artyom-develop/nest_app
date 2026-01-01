import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ActorService } from './actor.service';
import { CreateActorDto } from './dto/actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';

@Controller('actors')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Get()
  findAllActors() {
    return this.actorService.findAllActors();
  }

  @Get(':id')
  findActor(@Param('id') id: string) {
    return this.actorService.findActor(id);
  }

  @Post()
  create(@Body() dto: CreateActorDto) {
    return this.actorService.create(dto);
  }

  @Patch(':id')
  patchActor(@Param('id') id: string, @Body() dto: UpdateActorDto) {
    return this.actorService.patch(id, dto);
  }

  @Delete(':id')
  deleteActor(@Param('id') id: string) {
    return this.actorService.deleteActor(id);
  }
}
