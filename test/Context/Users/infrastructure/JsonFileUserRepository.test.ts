import { faker } from '@faker-js/faker';
import { JsonFileUserRepository } from '../../../../src/Context/Users/infrastructure/JsonFileUserRepository';
import { type UserRepository } from '../../../../src/Context/Users/domain/UserRepository';
import { User } from '../../../../src/Context/Users/domain/User';
import { UserEmail } from '../../../../src/Context/Users/domain/UserEmail';

let repository: UserRepository;

beforeEach(() => {
  repository = new JsonFileUserRepository();
});

describe('Json File User Repository', () => {
  test('Should save an user', async () => {
    const email = 'some_email@example.com';
    const id = faker.string.uuid();
    const password = 'some-password';

    const expectedUser = User.fromPrimitives({ email, id, password });
    await repository.create(expectedUser);

    const user = await repository.searchById(expectedUser.id);
    expect(expectedUser).toEqual(user);
  });

  test('Should get a user by him email', async () => {
    const email = new UserEmail('test@gmail.com');

    const user = await repository.searchByEmail(email);
    expect(user).toBeInstanceOf(User);
  });
});
