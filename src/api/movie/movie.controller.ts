import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MovieDtoRequest } from './dto/movie.dto';
import { MovieService } from './movie.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ApiCreateMovie,
  ApiDeleteMovie,
  ApiGetAllMovies,
  ApiGetMovieById,
  ApiPatchIsPublicMovie,
  ApiPutMovie,
} from '../../shared/decotators/api-swagger/movie.swagger.decorator';
import { Genre } from '@prisma/client';

@ApiTags('Movies')
@Controller('movies')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @ApiGetAllMovies()
  @Get()
  getMovies(@Query('releaseYear') releaseYear: string) {
    return this.movieService.findAll(+releaseYear);
  }

  @ApiGetMovieById()
  @Get(':id')
  getMovie(@Param('id') id: string) {
    return this.movieService.findMovieById(id);
  }

  @ApiCreateMovie()
  @Post()
  create(@Body() dto: MovieDtoRequest) {
    return this.movieService.create(dto);
  }
  @ApiPutMovie()
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: MovieDtoRequest) {
    return this.movieService.update(id, dto);
  }
  @ApiPatchIsPublicMovie()
  @Patch(':id')
  patchPublic(@Param('id') id: string) {
    return this.movieService.togglePublic(id);
  }
  @ApiDeleteMovie()
  @Delete(':id')
  deleteMovie(@Param('id') id: string) {
    return this.movieService.delete(id);
  }
}
