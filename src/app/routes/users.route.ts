import type * as express from 'express';
import { container } from '../dependency-injection';
import { type UserRegistrarPostController } from '../controllers/UserRegisterPostController';
import { body } from 'express-validator';
import { type ValidateReqSchemaMiddleware } from '../middlewares/ValidateReqSchemaMiddleware';
import { type UserLoginPostController } from '../controllers/UserLoginPostController';

export class UsersRoutesRegister {
  static register (router: express.Router): void {
    const validateSchemaMiddleware = container.get<ValidateReqSchemaMiddleware>('App.Backend.middlewares.ValidateReqSchemaMiddleware');
    const registerReqSchema = [
      body('email').exists().isString().isEmail().withMessage('Invalid email'),
      body('password').exists().isString()
    ];

    const userRegistrarPostController = container.get<UserRegistrarPostController>('App.Backend.controllers.UserRegistrarPostController');
    router.post('/register', registerReqSchema, validateSchemaMiddleware.run.bind(validateSchemaMiddleware), userRegistrarPostController.run.bind(userRegistrarPostController));

    const loginReqSchema = [
      body('email').exists().isString().isEmail().withMessage('Invalid email'),
      body('password').exists().isString()
    ];

    const userLoginPostController = container.get<UserLoginPostController>('App.Backend.controllers.UserLoginPostController');
    router.post('/login', loginReqSchema, validateSchemaMiddleware.run.bind(validateSchemaMiddleware), userLoginPostController.run.bind(userLoginPostController));
  }
}
