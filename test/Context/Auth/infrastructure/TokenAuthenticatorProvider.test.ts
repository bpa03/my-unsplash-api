import { JwtToken } from '../../../../src/Context/Auth/domain/JwtToken';
import { JwtTokenIsInvaid } from '../../../../src/Context/Auth/domain/JwtTokenIsInvalid';
import { Token } from '../../../../src/Context/Auth/domain/Token';
import { type TokenAuthenticator } from '../../../../src/Context/Auth/domain/TokenAuthenticator';
import { TokenAuthenticatorProvider } from '../../../../src/Context/Auth/infrastructure/TokenAuthenticatorProvider';
import { UserEmail } from '../../../../src/Context/Users/domain/UserEmail';

let authenticator: TokenAuthenticator;

beforeEach(() => {
  authenticator = new TokenAuthenticatorProvider();
});

describe('Token Authenticator Provider', () => {
  test('Should throw error if token is invalid', async () => {
    const jwtToken = new JwtToken('some-token');
    await expect(authenticator.verify(jwtToken)).rejects.toThrow(JwtTokenIsInvaid);
  });

  test('Should create a token from a given payload', async () => {
    const userEmail = new UserEmail('example@gmail.com');
    const payload = 'some-payload';

    const token = await authenticator.create({ userEmail, payload });
    expect(token).toBeInstanceOf(Token);
  });

  test('A created token should be valid', async () => {
    const userEmail = new UserEmail('example@gmail.com');
    const payload = 'some-payload';

    const token = await authenticator.create({ userEmail, payload });
    await expect(authenticator.verify(token.token)).resolves.not.toThrow(JwtTokenIsInvaid);
  });
});
