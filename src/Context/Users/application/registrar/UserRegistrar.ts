import { User } from '../../domain/User';
import { type UserRepository } from '../../domain/UserRepository';
import { type UserFinder } from '../finder/UserFinder';
import { type UserRegistrarRequest } from './UserRegistrarRequest';
import { UserAlreadyExists } from '../../domain/UserDup';

export class UserRegistrar {
  constructor (private readonly repository: UserRepository, private readonly finder: UserFinder) {}

  async exec (request: UserRegistrarRequest): Promise<void> {
    await this.ensureUserNotExists(request.email);

    const { email, id, password } = request;
    const user = User.fromPrimitives({ email, id, password });

    await this.repository.create(user);
  }

  private async ensureUserNotExists (email: string): Promise<void> {
    if (await this.finder.exec({ email })) {
      throw new UserAlreadyExists(`user with email <${email}> already exists`);
    }
  };
}
