import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { MovieDto } from './dto/movie.dto';
import { PrismaService } from '../../core/prisma/prisma.service';
import { Movie, MoviePoster } from '@prisma/client';
import { DefaultType } from '../../types/DefaultType';

@Injectable()
export class MovieService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.movie.findMany({
      where: { isAvailable: true },
      orderBy: { createdAt: 'desc' },
      // include: {
      //   actors: {
      //     select: {
      //       id: true,
      //       name: true,
      //     },
      //   },
      // },

      select: {
        id: true,
        title: true,
        releaseYear: true,
        description: true,
        reviews: {
          select: {
            id: true,
            rating: true,
            text: true,
          },
        },
        poster: {
          select: {
            id: true,
            url: true,
          },
        },
        posterId: true,
        actors: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findMovieById(id: string): Promise<Movie> {
    const movie = await this.prismaService.movie.findUnique({
      where: {
        id,
      },
      include: {
        poster: true,
        actors: true,
        reviews: true,
      },
    });
    if (!movie || !movie.isAvailable) {
      throw new NotFoundException('Фильм не найден');
    }
    return movie;
  }
  async create(dto: MovieDto): Promise<Movie> {
    const { title, releaseYear, actorIds, imageUrl } = dto;

    const actors = await this.prismaService.actor.findMany({
      where: {
        id: { in: actorIds },
      },
    });
    if (!actors || !actors.length) {
      throw new NotFoundException('Актеры не найдены');
    }

    const movie = await this.prismaService.movie.create({
      data: {
        title,
        releaseYear,
        rating: dto.rating ? dto.rating : 0,
        ...(imageUrl && {
          poster: {
            create: {
              url: imageUrl,
            },
          },
        }),
        actors: {
          connect: actors.map((actor) => ({ id: actor.id })),
        },
      },
    });

    return movie;
  }
  async update(id: string, dto: MovieDto): Promise<DefaultType> {
    const foundMovie = await this.findMovieById(id);

    const actors = await this.prismaService.actor.findMany({
      where: {
        id: { in: dto.actorIds },
      },
    });
    if (!actors || !actors.length) {
      throw new NotFoundException('Актеры не найдены');
    }

    await this.prismaService.movie.update({
      where: { id: foundMovie.id },
      data: {
        title: dto.title,
        releaseYear: dto.releaseYear,
        rating: dto.rating ? dto.rating : foundMovie.rating,
        poster: dto.imageUrl
          ? {
              create: {
                url: dto.imageUrl,
              },
            }
          : undefined,
        actors: {
          connect: actors.map((actor) => ({ id: actor.id })),
        },
      },
    });

    return {
      error: false,
      message: 'Фильм успешно обновлен',
    };
  }

  async togglePublic(id: string): Promise<DefaultType> {
    const foundMovie = await this.prismaService.movie.findUnique({
      where: { id },
    });
    if (!foundMovie) {
      throw new NotFoundException('Фильм не найден');
    }

    const newMovie = await this.prismaService.movie.update({
      where: { id: foundMovie.id },
      data: {
        isAvailable: !foundMovie.isAvailable,
      },
    });
    return {
      error: false,
      message: newMovie.isAvailable
        ? 'Фильм опубликован'
        : 'Фильм снят с публикации',
    };
  }

  async delete(id: string): Promise<DefaultType> {
    const foundMovie = await this.prismaService.movie.findUnique({
      where: { id },
    });
    if (!foundMovie) {
      throw new NotFoundException('Фильм не найден');
    }
    await this.prismaService.movie.delete({
      where: { id: foundMovie.id },
    });
    return {
      error: false,
      message: 'Фильм успешно удален',
    };
  }
}
