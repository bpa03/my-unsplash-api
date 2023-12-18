import { type Request, type Response, type NextFunction } from 'express';

export interface Middleware {
  run: (req: Request, res: Response, next: NextFunction) => Promise<void> | void
}
