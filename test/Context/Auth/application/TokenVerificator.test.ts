import { TokenVerificator } from '../../../../src/Context/Auth/application/verify/TokenVerificator';
import { JwtToken } from '../../../../src/Context/Auth/domain/JwtToken';
import { TokenAuthenticatorMock } from '../__mocks__/TokenAuthenticatorMock';

let tokenVerificator: TokenVerificator;
let authenticator: TokenAuthenticatorMock;

beforeEach(() => {
  authenticator = new TokenAuthenticatorMock();
  tokenVerificator = new TokenVerificator(authenticator);
});

describe('Token Creator', () => {
  test('Should create a token from a given payload', async () => {
    const request = {
      jwtToken: new JwtToken('some-token')
    };

    await tokenVerificator.exec(request);

    authenticator.assertVerifyHaveBeenCalled();
    authenticator.assertVerifyHaveBeenCalledWith(request.jwtToken);
  });
});
