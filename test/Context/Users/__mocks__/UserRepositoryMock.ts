import { genSalt, hash } from 'bcrypt';
import { type Nullable } from '../../../../src/Context/Shared/domain/Nullable';
import { User } from '../../../../src/Context/Users/domain/User';
import { type UserEmail } from '../../../../src/Context/Users/domain/UserEmail';
import { type UserId } from '../../../../src/Context/Users/domain/UserId';
import { type UserRepository } from '../../../../src/Context/Users/domain/UserRepository';

export class UserRepositoryMock implements UserRepository {
  private readonly createMock: jest.Mock;
  private readonly searchByEmailMock: jest.Mock;
  private readonly searchByIdMock: jest.Mock;

  constructor () {
    this.createMock = jest.fn();
    this.searchByEmailMock = jest.fn();
    this.searchByIdMock = jest.fn();
  }

  async searchById (id: UserId): Promise<Nullable<User>> {
    await this.searchByIdMock(id);
    return null;
  };

  async searchByEmail (email: UserEmail): Promise<Nullable<User>> {
    await this.searchByEmailMock(email);
    if (email.value === 'test@gmail.com') {
      const salts = await genSalt(10);
      const hashed = await hash('12345678', salts);

      return User.fromPrimitives({
        id: '4c239ac9-11c1-4777-adca-a23e42b1cf55',
        email: 'test@gmail.com',
        password: hashed
      });
    }

    return null;
  };

  async create (user: User): Promise<void> {
    await this.createMock(user);
  };

  assertCreateHaveBeenCalledWith (expected: User): void {
    expect(this.createMock).toHaveBeenCalledWith(expected);
  }

  assertSearchByEmailHaveBeenCalledWith (expected: UserEmail): void {
    expect(this.searchByEmailMock).toHaveBeenCalledWith(expected);
  }
}
