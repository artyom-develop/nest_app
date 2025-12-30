import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from '../movie/entites/movie.entity';
import { MovieService } from '../movie/movie.service';
import { ReviewEntity } from './entities/review.entity';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { ActorEntity } from '../actor/entities/actor.entity';
import { MoviePosterEntity } from '../movie/entites/poster.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity, MovieEntity, ActorEntity, MoviePosterEntity])],
  controllers: [ReviewController],
  providers: [ReviewService, MovieService],
})
export class ReviewModule {}
