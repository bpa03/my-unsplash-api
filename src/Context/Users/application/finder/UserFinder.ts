import { type Nullable } from '../../../Shared/Nullable';
import { type User } from '../../domain/User';
import { UserEmail } from '../../domain/UserEmail';
import { type UserRepository } from '../../domain/UserRepository';
import { type UserFinderRequest } from './UserFinderRequest';

export class UserFinder {
  constructor (private readonly repository: UserRepository) {}

  async exec (request: UserFinderRequest): Promise<Nullable<User>> {
    const { email } = request;
    const userEmail = new UserEmail(email);

    return await this.repository.searchByEmail(userEmail);
  }
}
