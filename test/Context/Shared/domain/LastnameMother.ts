import { faker } from '@faker-js/faker';

export class LastnameMother {
  static random (): string {
    return faker.person.lastName();
  }
}
