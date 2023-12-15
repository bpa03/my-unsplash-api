import { type TokenAuthenticator } from '../../domain/TokenAuthenticator';
import { type TokenVerificatorRequest } from './TokenVerificatorRequest';
import { JwtToken } from '../../domain/JwtToken';

export class TokenVerificator {
  constructor (private readonly authenticator: TokenAuthenticator) {}

  async exec (request: TokenVerificatorRequest): Promise<void> {
    const jwtToken = new JwtToken(request.jwtToken);

    await this.authenticator.verify(jwtToken);
  };
}
