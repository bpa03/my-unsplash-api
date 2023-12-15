import { User } from '../../domain/User';
import { type UserRepository } from '../../domain/UserRepository';
import { type UserRegistrarRequest } from './UserRegistrarRequest';

export class UserRegistrar {
  constructor (private readonly repository: UserRepository) {}

  async exec (request: UserRegistrarRequest): Promise<void> {
    const { email, id, password } = request;
    const user = User.fromPrimitives({ email, id, password });

    await this.repository.create(user);
  }
}
