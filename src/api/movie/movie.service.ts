import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { MovieDto } from './dto/movie.dto';
import { MovieEntity } from './entites/movie.entity';
import { DefaultType } from '../../types/DefaultType';
import { ActorEntity } from '../actor/entities/actor.entity';
import { MoviePosterEntity } from './entites/poster.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>,
    @InjectRepository(MoviePosterEntity)
    private readonly posterRepository: Repository<MoviePosterEntity>,
  ) {}

  async findAll(): Promise<MovieEntity[]> {
    return await this.movieRepository.find({
      where: {
        isAvailable: true,
      },
      order: {
        createdAt: 'desc',
      },
      take: 4,
      // skip: 1
      select: {
        id: true,
        title: true,
        releaseYear: true,
        createdAt: true,
      },
      relations: ['reviews', 'actors', 'poster'],
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
        description: true,
        createdAt: true,
      },
      relations: ['reviews', 'actors', 'poster'],
    });
    if (!movie) {
      throw new NotFoundException('Фильм не найден');
    }
    return movie;
  }
  async create(dto: MovieDto): Promise<MovieEntity> {
    const { title, releaseYear, actorIds, imageUrl } = dto;

    const actors = await this.actorRepository.find({
      where: {
        id: In(actorIds),
      },
    });
    if (!actors || !actors.length) {
      throw new NotFoundException('Актеры не найдены');
    }

    let poster: MoviePosterEntity | null = null;
    if (imageUrl) {
      poster = this.posterRepository.create({ imageUrl });
      await this.posterRepository.save(poster);
    }
    const movie = this.movieRepository.create({
      title,
      releaseYear,
      poster,
      actors,
    });

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
