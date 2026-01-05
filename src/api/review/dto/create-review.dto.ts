import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDecimal,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    description: 'Text of the review',
    example: 'Amazing movie with a mind-bending plot!',
    type: String,
  })
  @IsString()
  text: string;

  @ApiProperty({
    description: 'Rating of the movie from 0 to 10',
    example: '5.5',
    type: Number,
  })
  @IsNumber()
  @IsPositive()
  @Min(0)
  @Max(10)
  rating: number;

  @ApiProperty({
    description: 'Movie ID for which the review is written',
    example: '0336a3de-1199-45dd-86bc-449fcee66312',
    type: String,
  })
  @IsUUID('4')
  movieId: string;
}
