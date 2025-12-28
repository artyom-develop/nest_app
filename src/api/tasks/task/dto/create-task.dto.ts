import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  IsUUID,
  Length,
  Matches,
  MinLength,
} from 'class-validator';
import { TaskTagsEnum } from '../../../../types/task.enum';
import { StartWith } from '../../../../shared/decotators/start-with.decorator';

export class CreateTaskDto {
  @IsString({ message: 'Название задачи должно быть строкой!' })
  @IsNotEmpty({ message: 'Название задачи не может быть пустым' })
  @StartWith('Task:', { message: 'невалидное название' })
  @Length(3, 10, { message: 'Название должно быть от 3 до 10 символов' })
  title: string;

  @IsString({ message: 'Описание задачи должно быть строкой!' })
  @IsOptional()
  description: string;

  @IsInt({ message: 'Приоритет должен быть целым числом' })
  @IsPositive({ message: 'Приоритет должен быть положительным числом' })
  @IsOptional()
  priority: number;

  @IsArray({ message: 'теги должны быть массивом' })
  @IsEnum(TaskTagsEnum, {
    message: 'недопустимое название одного или нескольких тегов',
    each: true,
  })
  @IsOptional()
  tags: string[];

  @IsString({ message: 'Пароль должен быть строкой!' })
  @MinLength(6, { message: 'Минимальная длина пароля 6 символов' })
  @Matches(/^(?=.*[A-Z])(?=.*[0-9]).+$/, {
    message:
      'Пароль должен содержать хотя бы одну заглавную букву и одну цифру',
  })
  password: string;

  @IsUrl(
    {
      protocols: ['https', 'wss'],
      require_protocol: true,
      require_valid_protocol: true,
      host_whitelist: ['google.com', 'artyom-dev.ru'],
      host_blacklist: ['darknet.io'],
    },
    { message: 'Некорректное значение url' },
  )
  webSiteUrl: string;

  @IsUUID('4', { message: 'некорректный формат uuid' })
  @IsOptional()
  userId: string;
}
