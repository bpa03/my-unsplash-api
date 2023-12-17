import { parseArgs } from 'node:util';
import { PrismaClientFactory } from './PrismaClientFactory';
import { PrismaSeeder } from './PrismaSeeder';

async function main (): Promise<void> {
  const { values: { environment } } = parseArgs({ options: { environment: { type: 'string' } } });
  console.log(`Running seed on ${environment} mode`);

  const _client = await PrismaClientFactory.createClient();
  const seeder = new PrismaSeeder(_client);

  await seeder.seed(environment as 'development' | 'test');
  await _client.$disconnect();
}

main().catch(async (e) => {
  console.log(e);
  process.exit(1);
});
