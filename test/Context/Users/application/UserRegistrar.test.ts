import { faker } from '@faker-js/faker';
import { UserRegistrar } from '../../../../src/Context/Users/application/registrar/UserRegistrar';
import { User } from '../../../../src/Context/Users/domain/User';
import { UserRepositoryMock } from '../__mocks__/UserRepositoryMock';
import { UserEmailIsInvalid } from '../../../../src/Context/Users/domain/UserEmailIsInvalid';

let registrar: UserRegistrar;
let repository: UserRepositoryMock;

beforeEach(() => {
  repository = new UserRepositoryMock();
  registrar = new UserRegistrar(repository);
});

describe('User Registrar', () => {
  test('Should create and save a valid user', async () => {
    const request = { email: 'user@example.com', password: '12345678', id: faker.string.uuid() };
    const user = User.fromPrimitives(request);

    await registrar.exec(request);
    repository.assertCreateHaveBeenCalledWith(user);
  });

  test('Should throw error if user email is invalid', async () => {
    await expect(async () => {
      const request = { email: 'some-email', password: '12345678', id: faker.string.uuid() };
      const user = User.fromPrimitives(request);

      await registrar.exec(request);
      repository.assertCreateHaveBeenCalledWith(user);
    }).rejects.toThrow(UserEmailIsInvalid);
  });
});
