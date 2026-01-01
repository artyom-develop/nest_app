import { Inject, Injectable, type NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      `Request method: ${req.method} ${req.url} \n Body: ${req.body ? JSON.stringify(req.body) : 'No Body'}. Response: ${res.statusCode}`,
    );
    
    next();
  }
}
