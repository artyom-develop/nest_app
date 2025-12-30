import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { PatchReviewDto } from './dto/patch-review.dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  create(@Body() dto: CreateReviewDto) {
    return this.reviewService.createReviews(dto);
  }

  @Patch(':id')
  patchReview(@Param('id') id: string, @Body() dto: PatchReviewDto) {
    return this.reviewService.patchReview(id, dto);
  }

  @Delete(':id')
  deleteComment(@Param('id') id: string) {
    return this.reviewService.deleteReview(id);
  }
}
