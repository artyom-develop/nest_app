import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
  @ApiProperty({
    name: 'name',
    type: 'string',
    description: 'The name of the user',
    example: 'User',
    maxLength: 50,
  })
  name: string;
  @ApiProperty({
    name: 'email',
    type: 'string',
    description: 'The email of the user',
    example: 'user@mail.ru',
  })
  email: string;

  @ApiProperty({
    name: 'password',
    type: 'string',
    description: 'The password of the user',
    example: 'password1234',
    minLength: 6,
    maxLength: 128,
  })
  password: string;

  @ApiProperty({
    name: 'accessToken',
    type: 'string',
    description: 'JWT access token',
  })
  accessToken: string;
}
