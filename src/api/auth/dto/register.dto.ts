import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterRequest {
  @ApiProperty({
    name: 'name',
    type: 'string',
    description: 'The name of the user',
    example: 'User',
    maxLength: 50,
  })
  @IsString({
    message: 'Name must be a string',
  })
  @IsNotEmpty({
    message: 'Name is required',
  })
  @MaxLength(50, {
    message: 'Name must be at most 50 characters long',
  })
  name: string;

  @ApiProperty({
    name: 'email',
    type: 'string',
    description: 'The email of the user',
    example: 'user@mail.ru',
  })
  @IsString({
    message: 'Email must be a string',
  })
  @IsNotEmpty({
    message: 'Email is required',
  })
  @IsEmail(
    {},
    {
      message: 'Email must be a valid email address',
    },
  )
  email: string;

  @ApiProperty({
    name: 'password',
    type: 'string',
    description: 'The password of the user',
    example: 'password1234',
    minLength: 6,
    maxLength: 128,
  })
  @IsString({
    message: 'Password must be a string',
  })
  @IsNotEmpty({
    message: 'Password is required',
  })
  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  @MaxLength(128, {
    message: 'Password must be at most 128 characters long',
  })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]/, {
    message: 'Password must contain at least one letter and one number',
  })
  password: string;
}
