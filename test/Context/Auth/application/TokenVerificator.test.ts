import { TokenVerificator } from '../../../../src/Context/Auth/application/verify/TokenVerificator';
import { TokenAuthenticatorMock } from '../__mocks__/TokenAuthenticatorMock';

let tokenVerificator: TokenVerificator;
let authenticator: TokenAuthenticatorMock;

beforeEach(() => {
  authenticator = new TokenAuthenticatorMock();
  tokenVerificator = new TokenVerificator(authenticator);
});

describe('Token Verificator', () => {
  test('Should validate jwt token from a given request', async () => {
    const request = {
      jwtToken: 'some-token'
    };

    await tokenVerificator.exec(request);

    authenticator.assertVerifyHaveBeenCalled();
    authenticator.assertVerifyHaveBeenCalledWith(request.jwtToken);
  });
});
