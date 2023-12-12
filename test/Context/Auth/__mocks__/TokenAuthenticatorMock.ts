import { JwtToken } from '../../../../src/Context/Auth/domain/JwtToken';
import { Token } from '../../../../src/Context/Auth/domain/Token';
import { UserEmail } from '../../../../src/Context/Users/domain/UserEmail';
import { type TokenAuthenticator } from '../../../../src/Context/Auth/domain/TokenAuthenticator';

export class TokenAuthenticatorMock implements TokenAuthenticator {
  private readonly verifyMock: jest.Mock;
  private readonly crateMock: jest.Mock;

  constructor () {
    this.crateMock = jest.fn();
    this.verifyMock = jest.fn();
  }

  async verify (token: JwtToken): Promise<boolean> {
    await this.verifyMock(token);
    return true;
  };

  async create (payload: unknown): Promise<Token> {
    await this.crateMock(payload);
    return new Token({ email: new UserEmail('example@gmail.com'), token: new JwtToken('some-token') });
  };

  assertCreateHaveBeenCalled (): void {
    expect(this.crateMock).toHaveBeenCalledTimes(1);
  }

  assertCreateHaveBeenCalledWith (payload: unknown): void {
    expect(this.crateMock).toHaveBeenCalledWith(payload);
  }
}
