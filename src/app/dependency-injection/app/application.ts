import { type ContainerBuilder } from 'node-dependency-injection';
import { StatusGetController } from '../../controllers/StatusGetController';

export const registerAppControllers = (container: ContainerBuilder): void => {
  // Controllers
  container.register('App.Backend.controllers.StatusGetController', StatusGetController);
};
