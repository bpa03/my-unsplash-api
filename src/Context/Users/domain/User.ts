import { UserId } from './UserId';
import { UserEmail } from './UserEmail';
import { UserGender } from './UserGender';
import { AggregateRoot } from '../../Shared/domain/AggregateRoot';

export class User extends AggregateRoot {
  readonly id: UserId;
  readonly email: UserEmail;
  readonly password: string;
  readonly name: string | null;
  readonly lastname: string | null;
  readonly gender: UserGender | null;

  constructor ({ email, id, lastname, name, gender, password }: { id: UserId, email: UserEmail, name: string | null, lastname: string | null, gender: UserGender | null, password: string }) {
    super();
    this.id = id;
    this.email = email;
    this.password = password;
    this.name = name;
    this.lastname = lastname;
    this.gender = gender;
  }

  toPrimitives (): any {
    return {
      id: this.id.value,
      email: this.email.value,
      password: this.password,
      gender: this.gender?.value,
      name: this.name,
      lastname: this.lastname
    };
  }

  static fromPrimitives ({ email, id, lastname, name, gender, password }: { id: string, email: string, name?: string | null, lastname?: string | null, gender?: string | null, password: string }): User {
    return new User({
      id: new UserId(id),
      email: new UserEmail(email),
      password,
      gender: gender ? new UserGender(gender) : null,
      name: name ?? null,
      lastname: lastname ?? null
    });
  }
}
