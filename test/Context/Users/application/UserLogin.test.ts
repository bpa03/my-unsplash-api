import { TokenCreator } from '../../../../src/Context/Auth/application/create/TokenCreator';
import { UserFinder } from '../../../../src/Context/Users/application/finder/UserFinder';
import { UserLogin } from '../../../../src/Context/Users/application/login/UserLogin';
import { UserRepositoryMock } from '../__mocks__/UserRepositoryMock';
import { TokenAuthenticatorMock } from '../../Auth/__mocks__/TokenAuthenticatorMock';
import { UserEmail } from '../../../../src/Context/Users/domain/UserEmail';
import { Token } from '../../../../src/Context/Auth/domain/Token';
import { UserNotExist } from '../../../../src/Context/Users/domain/UserNotExist';
import { UserInvalidCredentials } from '../../../../src/Context/Users/domain/UserInvalidCredentials';

let repository: UserRepositoryMock;
let login: UserLogin;
let finder: UserFinder;
let tokenCreator: TokenCreator;
let authenticator: TokenAuthenticatorMock;

beforeEach(() => {
  repository = new UserRepositoryMock();
  authenticator = new TokenAuthenticatorMock();
  tokenCreator = new TokenCreator(authenticator);
  finder = new UserFinder(repository);
  login = new UserLogin(finder, tokenCreator);
});

describe('User Login', () => {
  test('Should create token from a given user credentials', async () => {
    const request = { email: 'test@gmail.com', password: '12345678' };
    const token = await login.exec(request);

    repository.assertSearchByEmailHaveBeenCalledWith(new UserEmail(request.email));
    expect(token).toBeInstanceOf(Token);
  });

  test('Should throw error if user not exists', async () => {
    const request = { email: 'random@gmail.com', password: '12345678' };
    await expect(login.exec(request)).rejects.toThrow(UserNotExist);
  });

  test('Should throw error if credentials not matches', async () => {
    const request = { email: 'test@gmail.com', password: 'random' };
    await expect(login.exec(request)).rejects.toThrow(UserInvalidCredentials);
  });
});
