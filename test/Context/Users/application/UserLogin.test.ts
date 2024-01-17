import { TokenCreator } from '../../../../src/Context/Auth/application/create/TokenCreator';
import { UserFinder } from '../../../../src/Context/Users/application/finder/UserFinder';
import { UserLogin } from '../../../../src/Context/Users/application/login/UserLogin';
import { UserRepositoryMock } from '../__mocks__/UserRepositoryMock';
import { TokenAuthenticatorMock } from '../../Auth/__mocks__/TokenAuthenticatorMock';
import { Token } from '../../../../src/Context/Auth/domain/Token';
import { UserNotExist } from '../../../../src/Context/Users/domain/UserNotExist';
import { UserInvalidCredentials } from '../../../../src/Context/Users/domain/UserInvalidCredentials';
import { UserLoginRequestMother } from './UserLoginRequestMother';
import { UserEmailMother } from '../domain/UserEmailMother';

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
    const request = UserLoginRequestMother.random({ email: 'test@gmail.com', password: '12345678' });
    const token = await login.exec(request);
    const email = UserEmailMother.create(request.email);

    repository.assertSearchByEmailHaveBeenCalledWith(email);
    expect(token).toBeInstanceOf(Token);
  });

  test('Should throw error if user not exists', async () => {
    const request = UserLoginRequestMother.random();
    await expect(login.exec(request)).rejects.toThrow(UserNotExist);
  });

  test('Should throw error if credentials not matches', async () => {
    const request = UserLoginRequestMother.random({ email: 'test@gmail.com' });
    await expect(login.exec(request)).rejects.toThrow(UserInvalidCredentials);
  });
});
