import { faker } from '@faker-js/faker';
import { UserEmail } from '../../../../src/Context/Users/domain/UserEmail';

export class UserEmailMother {
  static create (value: string): UserEmail {
    return new UserEmail(value);
  }

  static random (): UserEmail {
    return this.create(faker.internet.email());
  }
}
