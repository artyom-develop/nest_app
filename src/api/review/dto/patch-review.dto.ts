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
 
  @IsNumber()
  @Min(0)
  @Max(10)
  @IsPositive()
  @IsOptional()
  rating: number;

  @IsString()
  @IsOptional()
  text: string;
}
