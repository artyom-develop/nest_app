import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateActorDto {
  @ApiProperty({
    description: 'Name of the actor',
    example: 'Robert Downey Jr.',
    type: String,
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'Array of movie IDs the actor has acted in',
    example: ['0336a3de-1199-45dd-86bc-449fcee66312'],
    type: [String],
  })
  @IsArray()
  @IsUUID(4, { each: true })
  @IsOptional()
  movieIds: string[];
}
