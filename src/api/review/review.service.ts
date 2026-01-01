import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from '@prisma/client';
import { PatchReviewDto } from './dto/patch-review.dto';
import { DefaultType } from '../../types/DefaultType';

@Injectable()
export class ReviewService {
  constructor(private readonly prismaService: PrismaService) {}

  async createReviews(dto: CreateReviewDto): Promise<Review> {
    const { text, rating, movieId } = dto;
    const movie = await this.prismaService.movie.findUnique({
      where: { id: movieId },
    });
    if (!movie) {
      throw new NotFoundException('Фильм не найден');
    }
    const review = await this.prismaService.review.create({
      data: {
        text,
        rating,
        movie: {
          connect: {
            id: movieId,
          },
        },
      },
    });

    return review;
  }

  async findReviewById(id: string): Promise<Review> {
    const review = await this.prismaService.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException('Отзыв не найден');
    }
    return review;
  }

  async patchReview(id: string, dto: PatchReviewDto): Promise<Review> {
    const review = await this.findReviewById(id);

    return await this.prismaService.review.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  async deleteReview(id: string): Promise<DefaultType> {
    const review = await this.findReviewById(id);
    await this.prismaService.review.delete({
      where: { id: review.id },
    });
    return {
      error: false,
      message: 'Отзыв успешно удален',
    };
  }
}
