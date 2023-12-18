import { config } from 'dotenv';
import { BeforeAll, AfterAll } from '@cucumber/cucumber';
import { BackendApp } from '../../../../src/app/BackendApp';

let application: BackendApp;

BeforeAll(async () => {
  config({ path: '.env.test' });

  application = new BackendApp();
  await application.start();
});

AfterAll(async () => {
  await application.stop();
});

export { application };
