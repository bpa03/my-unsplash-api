import type * as express from 'express';
import { container } from '../dependency-injection';
import { type UserRegistrarPostController } from '../controllers/UserRegisterPostController';
import { body } from 'express-validator';
import { type ValidateReqSchemaMiddleware } from '../middlewares/ValidateReqSchemaMiddleware';

export class UsersRoutesRegister {
  static register (router: express.Router): void {
    const reqSchema = [
      body('email').exists().isString().isEmail().withMessage('Invalid email'),
      body('password').exists().isString()
    ];

    const validateSchemaMiddleware = container.get<ValidateReqSchemaMiddleware>('App.Backend.middlewares.ValidateReqSchemaMiddleware');
    const userRegistrarPostController = container.get<UserRegistrarPostController>('App.Backend.controllers.UserRegistrarPostController');
    router.post('/register', reqSchema, validateSchemaMiddleware.run.bind(validateSchemaMiddleware), userRegistrarPostController.run.bind(userRegistrarPostController));
  }
}
