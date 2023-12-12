import { type UserId } from './UserId';
import { type UserEmail } from './UserEmail';
import { type UserGender } from './UserGender';

export class User {
  readonly id: UserId;
  readonly email: UserEmail;
  readonly password: string;
  readonly name: string;
  readonly lastname: string;
  readonly gender: UserGender;

  constructor ({ email, id, lastname, name, gender, password }: { id: UserId, email: UserEmail, name: string, lastname: string, gender: UserGender, password: string }) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.name = name;
    this.lastname = lastname;
    this.gender = gender;
  }
}
