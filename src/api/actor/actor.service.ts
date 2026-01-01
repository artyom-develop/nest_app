import { Injectable, NotFoundException } from '@nestjs/common';
import { In } from 'typeorm';
import { CreateActorDto } from './dto/actor.dto';
import { NotFoundError } from 'rxjs';
import { UpdateActorDto } from './dto/update-actor.dto';

import { PrismaService } from '../../core/prisma/prisma.service';
import { Actor } from '@prisma/client';
import { DefaultType } from '../../types/DefaultType';

@Injectable()
export class ActorService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateActorDto): Promise<Actor> {
    const { name, movieIds } = dto;

    if (movieIds && movieIds.length) {
      const movies = await this.prismaService.movie.findMany({
        where: { id: { in: movieIds } },
      });
      if (!movies || !movies.length) {
        throw new NotFoundException('Фильм или фильмы не найдены');
      }
      const actor = this.prismaService.actor.create({
        data: {
          name,
          movies: {
            connect: movies.map((movie) => ({ id: movie.id })),
          },
        },
      });
      return actor;
    }
    const actor = this.prismaService.actor.create({
      data: {
        name,
      },
    });
    return actor;
  }

  async patch(id: string, dto: UpdateActorDto): Promise<Actor> {
    const { movieIds } = dto;
    const actor = await this.findActor(id);

    if (movieIds && movieIds.length) {
      const movies = await this.prismaService.movie.findMany({
        where: { id: { in: movieIds } },
      });
      if (!movies || !movies.length) {
        throw new NotFoundException('Фильм или фильмы не найдены');
      }
      return await this.prismaService.actor.update({
        where: { id },
        data: {
          name: dto.name ? dto.name : actor.name,
          movies: {
            set: movies.map((movie) => ({ id: movie.id })),
          },
        },
      });
    }
    return await this.prismaService.actor.update({
      where: { id },
      data: { name: dto.name ? dto.name : actor.name },
    });
  }
  async findActor(id: string): Promise<Actor> {
    const actor = await this.prismaService.actor.findUnique({
      where: { id },
      include: {
        movies: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
    if (!actor) {
      throw new NotFoundException('Актер не найден');
    }
    return actor;
  }

  async findAllActors(): Promise<Actor[] | []> {
    return await this.prismaService.actor.findMany({
      take: 3,
      orderBy: { name: 'desc' },
      include: {
        movies: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
  }
  async deleteActor(id: string): Promise<DefaultType> {
    const actor = await this.findActor(id);
    await this.prismaService.actor.delete({
      where: { id: actor.id },
    });
    return {
      error: false,
      message: 'Актер успешно удален',
    };
  }
}
