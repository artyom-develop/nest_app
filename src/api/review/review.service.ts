import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieService } from '../movie/movie.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { PatchReviewDto } from './dto/patch-review.dto';
import { ReviewEntity } from './entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private reviewRepository: Repository<ReviewEntity>,
    private movieService: MovieService,
  ) {}

  async createReviews(dto: CreateReviewDto): Promise<ReviewEntity> {
    const { text, rating, movieId } = dto;
    const movie = await this.movieService.findMovieById(movieId);

    const review = this.reviewRepository.create({
      text,
      rating,
      movie,
    });
    await this.reviewRepository.save(review);
    return review;
  }

  async findReviewById(id: string): Promise<ReviewEntity> {
    const review = await this.reviewRepository.findOne({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException('Отзыв не найден');
    }
    return review;
  }

  async patchReview(id: string, dto: PatchReviewDto) {
    const review = await this.findReviewById(id);

    Object.assign(review, dto);
    await this.reviewRepository.save(review);

    return {
      error: false,
      message: 'Отзыв успешно изменён',
    };
  }

  async deleteReview(id: string) {
    const review = await this.findReviewById(id);
    await this.reviewRepository.remove(review);
    return {
      error: false,
      message: 'Отзыв успешно удален',
    };
  }
}
