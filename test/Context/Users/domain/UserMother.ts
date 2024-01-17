import { User } from '../../../../src/Context/Users/domain/User';
import { type UserEmail } from '../../../../src/Context/Users/domain/UserEmail';
import { type UserGender } from '../../../../src/Context/Users/domain/UserGender';
import { type UserId } from '../../../../src/Context/Users/domain/UserId';
import { LastnameMother } from '../../Shared/domain/LastnameMother';
import { NameMother } from '../../Shared/domain/NameMother';
import { PasswordMother } from '../../Shared/domain/PasswordMother';
import { UserEmailMother } from './UserEmailMother';
import { UserGenderMother } from './UserGenderMother';
import { UserIdMother } from './UserIdMother';

export class UserMother {
  static create (id: UserId, email: UserEmail, password: string, name: string | null, lastname: string | null, gender: UserGender | null): User {
    return new User({ id, email, password, name, lastname, gender });
  }

  static fromRequest ({ email, id, lastname, name, gender, password }: { id: string, email: string, name?: string | null, lastname?: string | null, gender?: string | null, password: string }): User {
    return this.create(
      UserIdMother.create(id),
      UserEmailMother.create(email),
      password,
      name ?? null,
      lastname ?? null,
      gender ? UserGenderMother.create(gender) : null
    );
  }

  static random (values?: { email?: string }): User {
    return this.create(
      UserIdMother.random(),
      values?.email ? UserEmailMother.create(values.email) : UserEmailMother.random(),
      PasswordMother.random(),
      NameMother.random(),
      LastnameMother.random(),
      UserGenderMother.random()
    );
  }
}
