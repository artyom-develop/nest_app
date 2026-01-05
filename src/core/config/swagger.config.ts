import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MovieController } from '../../api/movie/movie.controller';
import { MovieModule } from '../../api/movie/movie.module';
import { MovieResponse } from '../../api/movie/response/movie.dto';
import { CreateActorDto } from '../../api/actor/dto/actor.dto';
import { UpdateActorDto } from '../../api/actor/dto/update-actor.dto';
import { CreateReviewDto } from '../../api/review/dto/create-review.dto';
import { PatchReviewDto } from '../../api/review/dto/patch-review.dto';

export const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Nest course api')
    .setDescription('Документация по API курсового проекта на NestJS')
    .setVersion('1.0.0')
    .setContact('Artyom Dev', 'https://artyom-dev.ru', 'artem2006pax@mail.ru')
    .addServer('http://localhost:3000/api', 'API server') // Добавьте сервер с префиксом
    .addBearerAuth()
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .setTermsOfService('https://artyom-dev.ru/privacy.html')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    // include: [MovieModule],
    // deepScanRoutes: true,
    // extraModels: [
    //   // CreateActorDto,
    //   // UpdateActorDto,
    //   // CreateReviewDto,
    //   // PatchReviewDto,
    // ],
    operationIdFactory: (controllerKey: string, methodKey: string) =>
      `${controllerKey}_${methodKey}`,
  });
  SwaggerModule.setup('/docs', app, document, {
    jsonDocumentUrl: '/swagger-json',
    yamlDocumentUrl: '/swagger-yaml',
    customfavIcon: 'https://nestjs.com/img/logo-small.svg',
    customSiteTitle: 'NestJS Course API Docs',
  });
};
