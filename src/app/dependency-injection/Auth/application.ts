import { type ContainerBuilder, Reference } from 'node-dependency-injection';
import { TokenCreator } from '../../../Context/Auth/application/create/TokenCreator';
import { TokenAuthenticatorProvider } from '../../../Context/Auth/infrastructure/TokenAuthenticatorProvider';

export const registerAuthModules = (container: ContainerBuilder): void => {
  container.register('App.Auth.Domain.Authenticator', TokenAuthenticatorProvider);
  container.register('App.Auth.Application.TokenCreator', TokenCreator).addArgument(new Reference('App.Auth.Domain.Authenticator'));
};
