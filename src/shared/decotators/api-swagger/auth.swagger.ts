import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AuthResponse } from '../../../api/auth/response/auth.response';
import { ErrorResponse } from '../../../api/auth/response/error.response';

export const RegistrationSwagger = () =>
  applyDecorators(
    ApiOperation({
      summary: 'User Registration',
      description: 'Endpoint for user registration',
    }),

    ApiResponse({
      status: HttpStatus.OK,
      type: AuthResponse,
    }),

    ApiResponse({
      status: 409,
      type: ErrorResponse,
    }),
  );

export const LoginSwagger = () =>
  applyDecorators(
    ApiOperation({
      summary: 'User Registration',
      description: 'Endpoint for user registration',
    }),

    ApiResponse({
      status: HttpStatus.OK,
      type: AuthResponse,
    }),
    ApiResponse({
      status: 400,
      type: ErrorResponse,
      example: {
        status: 400,
        message: ['Invalid password or email'],
        error: true,
      },
    }),
  );

export const LogoutSwagger = () =>
  applyDecorators(
    ApiOperation({
      summary: 'User logout',
      description: 'Endpoint for user logout',
    }),

    ApiResponse({
      status: HttpStatus.OK,
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Logout successful',
          },
          error: {
            type: 'boolean',
            example: false,
          },
        },
      },
    }),
  );

export const RefreshSwagger = () =>
  applyDecorators(
    ApiOperation({
      summary: 'User Refresh',
      description: 'Endpoint for user refresh',
    }),

    ApiResponse({
      status: HttpStatus.OK,
      schema: {
        type: 'object',
        properties: {
          accessToken: {
            type: 'string',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          },
        },
      },
    }),

    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      type: ErrorResponse,
      example: {
        status: 401,
        message: 'Unauthorized error',
        error: true,
      },
    }),
  );
