import { type Request, type Response } from 'express';

export interface GraphqlContext {
  req: Request;
  res: Response;
}
