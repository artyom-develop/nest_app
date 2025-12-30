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
  @IsString()
  text: string;


  @IsNumber()
  @IsPositive()
  @Min(0)
  @Max(10)
  rating: number;

  @IsUUID('4')
  movieId: string;
}
