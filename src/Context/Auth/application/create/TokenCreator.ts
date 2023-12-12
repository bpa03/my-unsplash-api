import { type Token } from '../../domain/Token';
import { type TokenAuthenticator } from '../../domain/TokenAuthenticator';
import { type TokenCreatorRequest } from './TokenCreatorRequest';

export class TokenCreator {
  constructor (private readonly authenticator: TokenAuthenticator) {}

  async exec (request: TokenCreatorRequest): Promise<Token> {
    return await this.authenticator.create(request);
  }
}
