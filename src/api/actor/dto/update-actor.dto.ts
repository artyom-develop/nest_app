import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateActorDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsArray()
  @IsUUID(4, { each: true })
  @IsOptional()
  movieIds: string[];
}
