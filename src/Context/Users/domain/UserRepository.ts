import { type User } from './User';
import { type UserEmail } from './UserEmail';
import { type Nullable } from '../../Shared/domain/Nullable';
import { type UserId } from './UserId';

export interface UserRepository {
  create: (user: User) => Promise<void>
  searchById: (id: UserId) => Promise<Nullable<User>>
  searchByEmail: (email: UserEmail) => Promise<Nullable<User>>
}
