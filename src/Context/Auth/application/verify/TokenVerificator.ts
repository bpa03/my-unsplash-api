import { type TokenAuthenticator } from '../../domain/TokenAuthenticator';
import { type TokenVerificatorRequest } from './TokenVerificatorRequest';

export class TokenVerificator {
  constructor (private readonly authenticator: TokenAuthenticator) {}

  async exec (request: TokenVerificatorRequest): Promise<void> {
    await this.authenticator.verify(request.jwtToken);
  };
}
