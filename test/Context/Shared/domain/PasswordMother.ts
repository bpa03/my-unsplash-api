import { faker } from '@faker-js/faker';

export class PasswordMother {
  static random (): string {
    return faker.string.alphanumeric({ length: 16, casing: 'mixed' });
  }
}
