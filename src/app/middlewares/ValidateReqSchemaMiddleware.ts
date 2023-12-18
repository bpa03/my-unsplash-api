import { type Request, type Response, type NextFunction } from 'express';
import { validationResult, type ValidationError } from 'express-validator';
import httpStatus from 'http-status';
import { type Middleware } from './Middleware';

type PathValidationError = ValidationError & {
  path: string
};

export class ValidateReqSchemaMiddleware implements Middleware {
  async run (req: Request, res: Response, next: NextFunction): Promise<void> {
    const validationErros = validationResult(req);
    if (validationErros.isEmpty()) {
      next();
      return;
    };

    const errors = validationErros.array().map((error: unknown) => {
      const { msg, path } = error as PathValidationError;
      return { [path]: msg };
    });
    res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ errors });
  };
}
