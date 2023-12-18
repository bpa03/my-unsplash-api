import { v4 as uuid } from 'uuid';
import { type PrismaClient } from '@prisma/client';

export class PrismaSeeder {
  constructor (private readonly _client: PrismaClient) {}

  async seed (environment: 'development' | 'test'): Promise<void> {
    switch (environment) {
      case 'development':
        await this._client.user.createMany({
          data: [
            {
              id: uuid(),
              email: 'bpa@gmail.com',
              password: '12345678'
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
              password: '12345678'
            }
          ]
        });
        break;
    }
  }
}
