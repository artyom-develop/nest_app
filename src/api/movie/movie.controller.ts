import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { MovieDto } from './dto/movie.dto';
import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get()
  getMovies() {
    return this.movieService.findAll();
  }

  @Get(':id')
  getMovie(@Param('id') id: string) {
    return this.movieService.findMovieById(id);
  }

  @Post()
  create(@Body() dto: MovieDto) {
    return this.movieService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: MovieDto) {
    return this.movieService.update(id, dto);
  }

  @Patch(':id')
  patchPublic(@Param('id') id: string) {
    return this.movieService.togglePublic(id);
  }
  @Delete(':id')
  deleteMovie(@Param('id') id: string) {
    return this.movieService.delete(id);
  }
}
