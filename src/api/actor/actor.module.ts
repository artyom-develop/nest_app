import { Module } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorController } from './actor.controller';
import { MovieService } from '../movie/movie.service';

@Module({
  controllers: [ActorController],
  providers: [ActorService, MovieService],
})
export class ActorModule {}
