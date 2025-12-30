import { Module } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorController } from './actor.controller';
import { ActorEntity } from './entities/actor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieService } from '../movie/movie.service';
import { MovieEntity } from '../movie/entites/movie.entity';
import { MoviePosterEntity } from '../movie/entites/poster.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ActorEntity, MovieEntity, MoviePosterEntity])],
  controllers: [ActorController],
  providers: [ActorService, MovieService],
})
export class ActorModule {}
