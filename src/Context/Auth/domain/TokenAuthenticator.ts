import { type UserEmail } from '../../Users/domain/UserEmail';
import { type JwtToken } from './JwtToken';
import { type Token } from './Token';

export interface TokenAuthenticator {
  verify: (token: JwtToken) => Promise<void> | void
  create: ({ userEmail, payload }: { userEmail: UserEmail, payload: unknown }) => Promise<Token> | Token
}
