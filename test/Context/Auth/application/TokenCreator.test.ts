import { TokenCreator } from '../../../../src/Context/Auth/application/create/TokenCreator';
import { UserEmail } from '../../../../src/Context/Users/domain/UserEmail';
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
    const email = 'example@email.com';
    const request = { email, payload };
    const parameters = { userEmail: new UserEmail(email), payload };

    await tokenCreator.exec(request);

    authenticator.assertCreateHaveBeenCalled();
    authenticator.assertCreateHaveBeenCalledWith(parameters);
  });
});
