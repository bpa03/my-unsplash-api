import { type User } from './User';

export interface UserRepository {
  create: (user: User) => Promise<void>
}
