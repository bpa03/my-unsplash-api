import { JwtToken } from '../../../../src/Context/Auth/domain/JwtToken';
import { Token } from '../../../../src/Context/Auth/domain/Token';
import { UserEmail } from '../../../../src/Context/Users/domain/UserEmail';
import { type TokenAuthenticator } from '../../../../src/Context/Auth/domain/TokenAuthenticator';

export class TokenAuthenticatorMock implements TokenAuthenticator {
  private readonly verifyMock: jest.Mock;
  private readonly createMock: jest.Mock;

  constructor () {
    this.createMock = jest.fn();
    this.verifyMock = jest.fn();
  }

  async verify (token: JwtToken): Promise<void> {
    await this.verifyMock(token.value);
  };

  async create (payload: unknown): Promise<Token> {
    await this.createMock(payload);
    return new Token({ email: new UserEmail('example@gmail.com'), token: new JwtToken('some-token') });
  };

  assertVerifyHaveBeenCalled (): void {
    expect(this.verifyMock).toHaveBeenCalledTimes(1);
  }

  assertVerifyHaveBeenCalledWith (jwtToken: string): void {
    expect(this.verifyMock).toHaveBeenLastCalledWith(jwtToken);
  }

  assertCreateHaveBeenCalled (): void {
    expect(this.createMock).toHaveBeenCalledTimes(1);
  }

  assertCreateHaveBeenCalledWith (payload: unknown): void {
    expect(this.createMock).toHaveBeenCalledWith(payload);
  }
}
