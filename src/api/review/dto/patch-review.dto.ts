import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class PatchReviewDto {
  @ApiProperty({
    description: 'Rating of the movie from 0 to 10',
    example: '5.5',
    type: Number,
  })
  @IsNumber()
  @Min(0)
  @Max(10)
  @IsPositive()
  @IsOptional()
  rating: number;

  @ApiProperty({
    description: 'Text of the review',
    example: 'Amazing movie with a mind-bending plot!',
    type: String,
  })
  @IsString()
  @IsOptional()
  text: string;
}
