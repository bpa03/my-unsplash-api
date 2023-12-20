import { Reference, type ContainerBuilder } from 'node-dependency-injection';
import { StatusGetController } from '../../controllers/StatusGetController';
import { UserRegistrarPostController } from '../../controllers/UserRegisterPostController';
import { ValidateReqSchemaMiddleware } from '../../middlewares/ValidateReqSchemaMiddleware';
import { UserLoginPostController } from '../../controllers/UserLoginPostController';

export const registerAppControllers = (container: ContainerBuilder): void => {
  // Middlewares
  container.register('App.Backend.middlewares.ValidateReqSchemaMiddleware', ValidateReqSchemaMiddleware);

  // Controllers
  container.register('App.Backend.controllers.StatusGetController', StatusGetController);
  container.register('App.Backend.controllers.UserRegistrarPostController', UserRegistrarPostController).addArgument(new Reference('App.User.Application.UserRegistrar'));
  container.register('App.Backend.controllers.UserLoginPostController', UserLoginPostController).addArgument(new Reference('App.User.Application.UserLogin'));
};
