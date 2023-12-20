import { ContainerBuilder } from 'node-dependency-injection';
import { registerAppControllers } from './app/application';
import { registerSharedModules } from './Shared/application';
import { registerUserModules } from './Users/application';
import { registerAuthModules } from './Auth/application';

const container = new ContainerBuilder();

registerSharedModules(container);
registerAuthModules(container);
registerUserModules(container);
registerAppControllers(container);

export { container };
