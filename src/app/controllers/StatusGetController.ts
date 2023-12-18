import { type Request, type Response } from 'express';
import { type Controller } from './Controller';
import httpStatus from 'http-status';

export class StatusGetController implements Controller {
  async run (req: Request, res: Response): Promise<void> {
    res.status(httpStatus.OK).json({ ping: 'pong' });
  };
}
