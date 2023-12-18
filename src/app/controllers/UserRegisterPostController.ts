import { v4 as uuid } from 'uuid';
import { type Request, type Response } from 'express';
import { type Controller } from './Controller';
import { type UserRegistrar } from '../../Context/Users/application/registrar/UserRegistrar';
import httpStatus from 'http-status';
import { UserAlreadyExists } from '../../Context/Users/domain/UserDup';

type UserRegisterRequest = Request<unknown, unknown, {
  email: string
  password: string
}>;

export class UserRegistrarPostController implements Controller {
  constructor (private readonly registrar: UserRegistrar) {}

  async run (req: UserRegisterRequest, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const id = uuid();

      await this.registrar.exec({ email, id, password });
      res.status(httpStatus.CREATED).send();
    } catch (error) {
      if (error instanceof UserAlreadyExists) {
        res.status(httpStatus.BAD_REQUEST).json({ msg: error.message });
        return;
      }

      throw error;
    }
  };
}
