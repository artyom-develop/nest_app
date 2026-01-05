import { ApiProperty } from '@nestjs/swagger';

export class MoviePosterDtoResponse {
  @ApiProperty({
    description: 'Id of the movie poster',
    example: '0336a3de-1199-45dd-86bc-449fcee66312',
    type: String,
  })
  id: string;
  @ApiProperty({
    description: 'URL of the movie poster',
    example: 'https://cat.png',
    type: String,
  })
  url: string;
}
