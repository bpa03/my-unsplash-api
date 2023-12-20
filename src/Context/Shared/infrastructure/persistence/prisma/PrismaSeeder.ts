import { genSalt, hash } from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { type PrismaClient } from '@prisma/client';

export class PrismaSeeder {
  constructor (private readonly _client: PrismaClient) {}

  async seed (environment: 'development' | 'test'): Promise<void> {
    const salts = await genSalt(10);
    const hashed = await hash('12345678', salts);

    switch (environment) {
      case 'development':
        await this._client.user.createMany({
          data: [
            {
              id: uuid(),
              email: 'bpa@gmail.com',
              password: hashed
            }
          ]
        });
        break;
      case 'test':
        await this._client.user.createMany({
          data: [
            {
              id: uuid(),
              email: 'test@gmail.com',
              password: hashed
            }
          ]
        });
        break;
    }
  }
}
