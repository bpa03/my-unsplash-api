import { type UserFinder } from '../finder/UserFinder';
import { type UserLoginRequest } from './UserLoginRequest';
import { type TokenCreator } from '../../../Auth/application/create/TokenCreator';
import { type Token } from '../../../Auth/domain/Token';
import { UserNotExist } from '../../domain/UserNotExist';
import { type User } from '../../domain/User';
import { UserInvalidCredentials } from '../../domain/UserInvalidCredentials';

export class UserLogin {
  constructor (private readonly finder: UserFinder, private readonly creator: TokenCreator) {}

  async exec (request: UserLoginRequest): Promise<Token> {
    const { email, password } = request;
    const user = await this.ensureUserExists(email);
    await this.ensureCredentialsMatches(password, user);

    const token = await this.creator.exec({ email, payload: { email } });
    return token;
  }

  async ensureUserExists (email: string): Promise<User> {
    const user = await this.finder.exec({ email });
    if (!user) {
      throw new UserNotExist(`user <${email}> not exists`);
    }

    return user;
  }

  async ensureCredentialsMatches (password: string, user: User): Promise<void> {
    if (!(await user.passwordMatches(password))) {
      throw new UserInvalidCredentials('Credentials are invalid');
    }
  }
}
