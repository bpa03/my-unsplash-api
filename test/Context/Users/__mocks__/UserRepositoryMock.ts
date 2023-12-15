import { type User } from '../../../../src/Context/Users/domain/User';
import { type UserRepository } from '../../../../src/Context/Users/domain/UserRepository';

export class UserRepositoryMock implements UserRepository {
  private readonly createMock: jest.Mock;

  constructor () {
    this.createMock = jest.fn();
  }

  async create (user: User): Promise<void> {
    await this.createMock(user);
  };

  assertCreateHaveBeenCalledWith (expected: User): void {
    expect(this.createMock).toHaveBeenCalledWith(expected);
  }
}
