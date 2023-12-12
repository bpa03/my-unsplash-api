import { TokenCreator } from '../../../../src/Context/Auth/application/create/TokenCreator';
import { Token } from '../../../../src/Context/Auth/domain/Token';
import { TokenAuthenticatorMock } from '../__mocks__/TokenAuthenticatorMock';

let tokenCreator: TokenCreator;
let authenticator: TokenAuthenticatorMock;

beforeEach(() => {
  authenticator = new TokenAuthenticatorMock();
  tokenCreator = new TokenCreator(authenticator);
});

describe('Token Creator', () => {
  test('Should create a token from a given payload', async () => {
    const payload = 'some-payload';
    const email = 'some-email';
    const request = { email, payload };

    const token = await tokenCreator.exec(request);
    expect(token).toBeInstanceOf(Token);

    authenticator.assertCreateHaveBeenCalled();
    authenticator.assertCreateHaveBeenCalledWith(request);
  });
});
