import { faker } from '@faker-js/faker';
import { JsonFileUserRepository } from '../../../../src/Context/Users/infrastructure/JsonFileUserRepository';
import { type UserRepository } from '../../../../src/Context/Users/domain/UserRepository';
import { User } from '../../../../src/Context/Users/domain/User';

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
});
