import { type UserEmail } from '../../Users/domain/UserEmail';
import { type JwtToken } from './JwtToken';

export class Token {
  readonly email: UserEmail;
  readonly token: JwtToken;

  constructor ({ token, email }: { email: UserEmail, token: JwtToken }) {
    this.email = email;
    this.token = token;
  }
}
