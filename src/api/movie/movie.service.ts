import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieDto } from './dto/movie.dto';
import { MovieEntity } from './entites/movie.entity';
import { DefaultType } from '../../types/DefaultType';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  async findAll(): Promise<MovieEntity[]> {
    return await this.movieRepository.find({
      order: {
        createdAt: 'desc',
      },
      take: 4,
      // skip: 1
      select: {
        id: true,
        title: true,
        rating: true,
        genre: true,
        releaseYear: true,
      },
    });
  }

  async findMovieById(id: string): Promise<MovieEntity> {
    const movie = await this.movieRepository.findOne({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        releaseYear: true,
      },
    });
    if (!movie) {
      throw new NotFoundException('Фильм не найден');
    }
    return movie;
  }
  async create(dto: MovieDto): Promise<MovieEntity> {
    const movie = this.movieRepository.create(dto);

    return await this.movieRepository.save(movie);
  }
  async update(id: string, dto: MovieDto): Promise<DefaultType> {
    const foundMovie = await this.findMovieById(id);
    Object.assign(foundMovie, dto);
    await this.movieRepository.save(foundMovie);
    return {
      error: false,
      message: 'Фильм успешно обновлен',
    };
  }

  async togglePublic(id: string): Promise<DefaultType> {
    const foundMovie = await this.findMovieById(id);
    if (foundMovie.isAvailable) {
      return {
        error: false,
        message: 'Фильм уже опубликован',
      };
    }
    foundMovie.isAvailable = !foundMovie.isAvailable;
    await this.movieRepository.save(foundMovie);
    return {
      error: false,
      message: foundMovie.isAvailable
        ? 'Фильм опубликован'
        : 'Фильм снят с публикации',
    };
  }

  async delete(id: string): Promise<DefaultType> {
    const foundMovie = await this.findMovieById(id);
    await this.movieRepository.remove(foundMovie);
    return {
      error: false,
      message: 'Фильм успешно удален',
    };
  }
}
