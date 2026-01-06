import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class GoogleDto {
  @IsString()
  @IsNotEmpty()
  googleId: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  name: string;
}
