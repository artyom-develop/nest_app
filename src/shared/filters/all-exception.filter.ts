import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { type Response } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse() as Response;

    let status = 500;
    let msg: string = 'Internal server error';
    let error = true; // Булевое значение для error

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        msg = (exceptionResponse as any).message || msg;
      } else {
        msg = exceptionResponse as string;
      }
    }
    const message: string[] = Array.isArray(msg) ? [...msg] : [msg];
    const responseBody = {
      status,
      message,
      error,
      // timestamp: new Date().toISOString(),
      // path: ctx.getRequest().url,
    };

    this.logger.error(
      JSON.stringify(responseBody),
      // exception instanceof Error ? exception.stack : '',
    );
    response.status(status).json(responseBody);
  }
}
