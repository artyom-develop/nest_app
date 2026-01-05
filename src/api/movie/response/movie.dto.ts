import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Actor, MoviePoster } from '@prisma/client';
import { Movie } from '../../../../generated/prisma';
import { MoviePosterDtoResponse } from '../dto/movie-poster.dto';
import { url } from 'inspector';

export class MovieResponse {
  @ApiProperty({
    description: 'Id of the movie',
    example: '15f9409d-c084-4802-8944-b8af6fd9f44c',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'Title of the movie',
    example: 'Inception',
    type: String,
  })
  title: string;

  @ApiProperty({
    description: 'Release year of the movie',
    type: Number,
    example: 2024,
  })
  releaseYear: number;

  @ApiProperty({
    description: 'Description of the movie',
    type: Number,
    example: 'A mind-bending thriller about dreams within dreams.',
  })
  description: string | null;

  @ApiProperty({
    description: 'Release year of the movie',
    example: '5.4',
    type: Number,
  })
  rating: number;

  @ApiProperty({
    description: 'Link for poster image',
    example: {
      id: 'b9ea6dab-a982-49d1-8ba6-43408e354882',
      url: 'https://cat.png',
    },
    type: MoviePosterDtoResponse,
  })
  poster: MoviePosterDtoResponse;

  @ApiProperty({
    description: 'List of movies',
    example: [
      {
        id: '0336a3de-1199-45dd-86bc-449fcee66312',
        name: 'Бред Пит',
      },
    ],
    type: Array<Actor>,
  })
  actors: Actor[];

  @ApiProperty({
    description: 'Description of the movie',
    example: 'ACTION',
    type: String,
  })
  genre: string;
}
