import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class MovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1888)
  @Max(new Date().getFullYear())
  releaseYear: number;

  @IsNumber()
  @Min(0)
  @Max(10)
  @IsPositive()
  @IsOptional()
  rating: number;

  @IsArray()
  @IsUUID('4', { each: true })
  actorIds: string[];

  @IsString()
  @IsUrl()
  imageUrl: string;
}
