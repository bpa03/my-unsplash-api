import { ContainerBuilder } from 'node-dependency-injection';
import { registerAppControllers } from './app/application';
import { registerSharedModules } from './Shared/application';
import { registerUserModules } from './Users/application';

const container = new ContainerBuilder();

registerSharedModules(container);
registerUserModules(container);
registerAppControllers(container);

export { container };
