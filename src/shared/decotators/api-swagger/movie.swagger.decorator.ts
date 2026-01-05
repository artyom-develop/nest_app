import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBody,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Genre, Actor, Review, MoviePoster } from '@prisma/client';
import { MovieResponse } from '../../../api/movie/response/movie.dto';
// Декоратор для GET movie by ID
export const ApiGetMovieById = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Get movie by ID',
      description: 'Return info of movie by id.',
    }),
    ApiOkResponse({
      description: 'Object movie retrieved successfully.',
      type: MovieResponse,
    }),
    ApiResponse({
      status: 404,
      description: 'Movie not Found',
      schema: {
        type: 'object',
        properties: {
          error: {
            type: 'boolean',
            example: true,
          },
          message: {
            type: 'string',
            example: 'Movie not Found',
          },
        },
      },
    }),

    ApiParam({
      name: 'id',
      type: 'string',
      description: 'Movie ID',
      example: '15f9409d-c084-4802-8944-b8af6fd9f44c',
    }),
    ApiHeader({
      name: 'X-Auth-Token',
      description: 'Authentication token',
    }),
  );

// Декоратор для GET all movies
export const ApiGetAllMovies = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Get all movies',
      description: 'Returns all movies that have a public flag.',
    }),
    ApiOkResponse({
      description: 'List of movies retrieved successfully.',
      type: [MovieResponse],
    }),
    ApiQuery({
      name: 'releaseYear',
      type: 'number',
      required: false,
      description: 'Filter movies by release year',
    }),
  );
// Декоратор для POST  movie
export const ApiCreateMovie = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Create new movie',
      description: 'Return new movie.',
    }),
    ApiOkResponse({
      description: 'New movie retrieved successfully.',
      type: MovieResponse,
    }),

    ApiBody({
      schema: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            example: 'Advangers 2',
          },
          releaseYear: {
            type: 'number',
            example: new Date().getFullYear(),
          },
          rating: {
            type: 'number',
            example: 5.5,
          },

          imageUrl: {
            type: 'string',
            example: 'https://cat.png',
          },
          actorIds: {
            type: 'array',
            items: { type: 'string' },
            example: ['0336a3de-1199-45dd-86bc-449fcee66312'],
          },
        },
      },
    }),
  );

export const ApiPutMovie = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Update movie',
      description: 'Update movie.',
    }),
    ApiOkResponse({
      description: 'Movie success update.',
      schema: {
        type: 'object',
        properties: {
          error: {
            type: 'boolean',
            example: false,
          },
          message: {
            type: 'string',
            example: 'Movie successfully updated',
          },
        },
      },
    }),
    ApiUnauthorizedResponse({
      description: 'Movie not Found',
      schema: {
        type: 'object',
        properties: {
          error: {
            type: 'boolean',
            example: true,
          },
          message: {
            type: 'string',
            example: 'Movie not Found',
          },
        },
      },
    }),
    ApiParam({
      name: 'id',
      type: 'string',
      description: 'Movie ID',
      example: '13b23d4c-5b81-4ed8-8467-89db1eacf26d',
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            example: 'Advangers 2',
          },
          releaseYear: {
            type: 'number',
            example: new Date().getFullYear(),
          },
          rating: {
            type: 'number',
            example: 5.5,
          },
          actorIds: {
            type: 'array',
            items: { type: 'string' },
            example: ['0336a3de-1199-45dd-86bc-449fcee66312'],
          },
          imageUrl: {
            type: 'string',
            example: 'https://cat.png',
          },
        },
      },
    }),
  );

export const ApiPatchIsPublicMovie = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Patch public movie',
      description: 'Patch public movies.',
    }),
    ApiResponse({
      status: 201,
      description: 'Movie isPublic updated successfully',
      schema: {
        type: 'object',
        properties: {
          error: {
            type: 'boolean',
            example: false,
          },
          message: {
            type: 'string',
            example: 'Movie successfully toggled isPublic',
          },
        },
      },
    }),

    ApiResponse({
      status: 404,
      description: 'Movie not Found',
      schema: {
        type: 'object',
        properties: {
          error: {
            type: 'boolean',
            example: true,
          },
          message: {
            type: 'string',
            example: 'Movie not Found',
          },
        },
      },
    }),
    ApiParam({
      name: 'id',
      type: 'string',
      description: 'Movie ID',
      example: '13b23d4c-5b81-4ed8-8467-89db1eacf26d',
    }),
  );

export const ApiDeleteMovie = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Delete movie',
      description: 'Delete movie by ID.',
    }),
    ApiResponse({
      status: 201,
      description: 'Movie successfully delete',
      schema: {
        type: 'object',
        properties: {
          error: {
            type: 'boolean',
            example: false,
          },
          message: {
            type: 'string',
            example: 'Movie successfully delete',
          },
        },
      },
    }),

    ApiResponse({
      status: 404,
      description: 'Movie not Found',
      schema: {
        type: 'object',
        properties: {
          error: {
            type: 'boolean',
            example: true,
          },
          message: {
            type: 'string',
            example: 'Movie not Found',
          },
        },
      },
    }),

    ApiParam({
      name: 'id',
      type: 'string',
      description: 'Movie ID',
      example: '13b23d4c-5b81-4ed8-8467-89db1eacf26d',
    }),
  );
