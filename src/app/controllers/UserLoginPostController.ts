import { type Request, type Response } from 'express';
import { type Controller } from './Controller';
import { type UserLogin } from '../../Context/Users/application/login/UserLogin';
import httpStatus from 'http-status';
import { UserNotExist } from '../../Context/Users/domain/UserNotExist';
import { UserInvalidCredentials } from '../../Context/Users/domain/UserInvalidCredentials';

type UserLoginRequest = Request<unknown, unknown, {
  email: string
  password: string
}>;

export class UserLoginPostController implements Controller {
  constructor (private readonly login: UserLogin) {}

  async run (req: UserLoginRequest, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await this.login.exec({ email, password });

      res.status(httpStatus.OK).json({ access: token.token, email: token.email });
    } catch (error) {
      if (error instanceof UserNotExist) {
        res.status(httpStatus.UNAUTHORIZED).json({ msg: error.message });
        return;
      }

      if (error instanceof UserInvalidCredentials) {
        res.status(httpStatus.UNAUTHORIZED).json({ msg: error.message });
        return;
      }

      throw error;
    }
  };
}
