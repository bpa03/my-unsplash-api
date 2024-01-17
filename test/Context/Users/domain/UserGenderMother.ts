import { UserGender } from '../../../../src/Context/Users/domain/UserGender';
import { faker } from '@faker-js/faker';

export class UserGenderMother {
  static create (value: string): UserGender {
    return new UserGender(value);
  }

  static random (): UserGender {
    const number = faker.number.int({ min: 0, max: 1 });
    const gender = number ? 'male' : 'female';

    return this.create(gender);
  }
}
