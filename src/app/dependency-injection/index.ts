import { ContainerBuilder } from 'node-dependency-injection';
import { registerAppControllers } from './app/application';

const container = new ContainerBuilder();

registerAppControllers(container);

export { container };
