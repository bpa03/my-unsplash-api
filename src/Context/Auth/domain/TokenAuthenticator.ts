import { type JwtToken } from './JwtToken';
import { type Token } from './Token';

export interface TokenAuthenticator {
  verify: (token: JwtToken) => Promise<boolean> | boolean
  create: (payload: unknown) => Promise<Token> | Token
}
