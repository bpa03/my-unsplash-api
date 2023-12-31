import { User } from '../../../../src/Context/Users/domain/User';
import { type UserRepository } from '../../../../src/Context/Users/domain/UserRepository';
import { PrismaClientFactory } from '../../../../src/Context/Shared/infrastructure/persistence/prisma/PrismaClientFactory';
import { PrismaUserRepository } from '../../../../src/Context/Users/infrastructure/persistence/PrismaUserRepository';
import { faker } from '@faker-js/faker';
import { UserEmail } from '../../../../src/Context/Users/domain/UserEmail';

let repository: UserRepository;

beforeEach(() => {
  repository = new PrismaUserRepository(PrismaClientFactory.createClient());
});

describe('Prisma User Repository', () => {
  test('Should save a valid user', async () => {
    const expectedUser = User.fromPrimitives({
      email: faker.internet.email(),
      id: faker.string.uuid(),
      password: '1234'
    });

    await repository.create(expectedUser);
    const user = await repository.searchById(expectedUser.id);

    expect(user?.id.value).toEqual(expectedUser.id.value);
    expect(user?.email.value).toEqual(expectedUser.email.value);
  });

  test('Should find a user by his email', async () => {
    const userEmail = new UserEmail('test@gmail.com');
    const user = await repository.searchByEmail(userEmail);

    expect(user).toBeInstanceOf(User);
    expect(userEmail.value).toStrictEqual(user?.email.value);
  });
});
