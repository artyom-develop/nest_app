import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ActorEntity } from './entities/actor.entity';
import { CreateActorDto } from './dto/actor.dto';
import { NotFoundError } from 'rxjs';
import { MovieEntity } from '../movie/entites/movie.entity';
import { UpdateActorDto } from './dto/update-actor.dto';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(ActorEntity)
    private actorRepository: Repository<ActorEntity>,
    @InjectRepository(MovieEntity)
    private movieRepository: Repository<MovieEntity>,
  ) {}

  async create(dto: CreateActorDto): Promise<ActorEntity> {
    const { name, movieIds } = dto;

    if (movieIds && movieIds.length) {
      const movies = await this.movieRepository.find({
        where: { id: In(movieIds) },
      });
      if (!movies || !movies.length) {
        throw new NotFoundException('Фильм или фильмы не найдены');
      }
      const actor = this.actorRepository.create({ name, movies });
      return await this.actorRepository.save(actor);
    }
    const actor = this.actorRepository.create({ name});
    return await this.actorRepository.save(actor);
  }

  async patch(id: string, dto: UpdateActorDto): Promise<ActorEntity> {
    const { name, movieIds } = dto;
    const actor = await this.findActor(id);

    if (movieIds && movieIds.length) {
      const movies = await this.movieRepository.find({
        where: { id: In(movieIds) },
      });
      if (!movies || !movies.length) {
        throw new NotFoundException('Фильм или фильмы не найдены');
      }
      actor.movies = movies;
    }

    actor.name = name ?? actor.name;

    return await this.actorRepository.save(actor);
  }
  async findActor(id: string): Promise<ActorEntity> {
    const actor = await this.actorRepository.findOne({
      where: { id },
      relations: ['movies'],
    });
    if (!actor) {
      throw new NotFoundException('Актер не найден');
    }
    return actor;
  }

  async findAllActors(): Promise<ActorEntity[]> {
    return await this.actorRepository.find({
      take: 10,
      order: {
        createdAt: 'desc',
      },
      relations: ['movies'],
    });
  }
  async deleteActor(id: string) {
    const actor = await this.findActor(id);
    await this.actorRepository.remove(actor);
    return {
      error: false,
      message: 'Актер успешно удален',
    };
  }
}
