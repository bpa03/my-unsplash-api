import fs from 'fs/promises';
import path from 'path';
import { type UserRepository } from '../../domain/UserRepository';
import { type Nullable } from '../../../Shared/domain/Nullable';
import { User } from '../../domain/User';
import { type UserEmail } from '../../domain/UserEmail';
import { type UserId } from '../../domain/UserId';

export interface StoredUser {
  id: string
  email: string
  password: string
  name?: string
  lastname?: string
  gender?: string
}

export class JsonFileUserRepository implements UserRepository {
  private readonly FILE_PATH = path.join(__dirname, 'users.json');

  private async getDataFromJson (): Promise<StoredUser[]> {
    const data = await fs.readFile(this.FILE_PATH, { encoding: 'utf-8' });
    return data ? JSON.parse(data) as StoredUser[] : [];
  }

  async create (user: User): Promise<void> {
    const users = await this.getDataFromJson();
    users.push(user.toPrimitives() as StoredUser);
    await fs.writeFile(this.FILE_PATH, JSON.stringify(users));
  };

  async searchById (id: UserId): Promise<Nullable<User>> {
    const users = await this.getDataFromJson();
    const user = users.find((user) => user.id === id.value);
    return user ? User.fromPrimitives(user) : null;
  };

  async searchByEmail (email: UserEmail): Promise<Nullable<User>> {
    const users = await this.getDataFromJson();
    const user = users.find((user) => user.email === email.value);
    return user ? User.fromPrimitives(user) : null;
  };
}
