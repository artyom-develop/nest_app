import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
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

export class MovieDtoRequest {
  @ApiProperty({
    description: 'Title of the movie',
    example: 'Inception',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Release year of the movie',
    type: Number,
    example: 2024,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1888)
  @Max(new Date().getFullYear())
  releaseYear: number;

  @ApiPropertyOptional({
    description: 'Release year of the movie',
    example: '5.4',
    type: Number,
  })
  @IsNumber()
  @Min(0)
  @Max(10)
  @IsPositive()
  @IsOptional()
  rating: number;

  @ApiProperty({
    description: 'Link for poster image',
    example: ['0336a3de-1199-45dd-86bc-449fcee66312'],
    type: Array<String>,
  })
  @IsArray()
  @IsUUID('4', { each: true })
  actorIds: string[];

  @ApiProperty({
    description: 'Link for poster image',
    example: 'https://cat.png',
    type: String,
  })
  @IsString()
  @IsUrl()
  imageUrl: string;
}
