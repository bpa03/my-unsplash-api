import { UserRegistrar } from '../../../../src/Context/Users/application/registrar/UserRegistrar';
import { UserRepositoryMock } from '../__mocks__/UserRepositoryMock';
import { UserEmailIsInvalid } from '../../../../src/Context/Users/domain/UserEmailIsInvalid';
import { UserFinder } from '../../../../src/Context/Users/application/finder/UserFinder';
import { UserAlreadyExists } from '../../../../src/Context/Users/domain/UserDup';
import { UserRegistrarRequestMother } from './UserRegistrarRequestMother';
import { UserMother } from '../domain/UserMother';

let registrar: UserRegistrar;
let finder: UserFinder;
let repository: UserRepositoryMock;

beforeEach(() => {
  repository = new UserRepositoryMock();
  finder = new UserFinder(repository);
  registrar = new UserRegistrar(repository, finder);
});

describe('User Registrar', () => {
  test('Should create and save a valid user', async () => {
    const request = UserRegistrarRequestMother.random();
    const user = UserMother.fromRequest(request);

    await registrar.exec(request);
    repository.assertCreateHaveBeenCalledWith(user);
  });

  test('Should throw error if user email is invalid', async () => {
    await expect(async () => {
      const request = UserRegistrarRequestMother.random({ email: 'some-email' });
      const user = UserMother.fromRequest(request);

      await registrar.exec(request);
      repository.assertCreateHaveBeenCalledWith(user);
    }).rejects.toThrow(UserEmailIsInvalid);
  });

  test('Should throw error if user already exists', async () => {
    await expect(async () => {
      const request = UserRegistrarRequestMother.random({ email: 'test@gmail.com' });
      const user = UserMother.fromRequest(request);

      await registrar.exec(request);
      repository.assertCreateHaveBeenCalledWith(user);
    }).rejects.toThrow(UserAlreadyExists);
  });
});
