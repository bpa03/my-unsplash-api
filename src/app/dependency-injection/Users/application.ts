import { type ContainerBuilder, Reference } from 'node-dependency-injection';
import { PrismaUserRepository } from '../../../Context/Users/infrastructure/persistence/PrismaUserRepository';
import { UserRegistrar } from '../../../Context/Users/application/registrar/UserRegistrar';
import { UserFinder } from '../../../Context/Users/application/finder/UserFinder';
import { UserLogin } from '../../../Context/Users/application/login/UserLogin';

export const registerUserModules = (container: ContainerBuilder): void => {
  container.register('App.User.Domain.UserRepository', PrismaUserRepository).addArgument(new Reference('App.Shared.ConnectionManager'));
  container.register('App.User.Application.UserFinder', UserFinder).addArgument(new Reference('App.User.Domain.UserRepository'));
  container.register('App.User.Application.UserRegistrar', UserRegistrar).addArgument(new Reference('App.User.Domain.UserRepository')).addArgument(new Reference('App.User.Application.UserFinder'));
  container.register('App.User.Application.UserLogin', UserLogin).addArgument(new Reference('App.User.Application.UserFinder')).addArgument(new Reference('App.Auth.Application.TokenCreator'));
};
