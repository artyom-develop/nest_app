import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './entites/movie.entity';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';

import { ActorEntity } from '../actor/entities/actor.entity';
import { MoviePosterEntity } from './entites/poster.entity'

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity, ActorEntity, MoviePosterEntity ])],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
