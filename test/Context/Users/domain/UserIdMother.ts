import { faker } from '@faker-js/faker';
import { UserId } from '../../../../src/Context/Users/domain/UserId';

export class UserIdMother {
  static create (value: string): UserId {
    return new UserId(value);
  }

  static random (): UserId {
    return this.create(faker.string.uuid());
  }
}
