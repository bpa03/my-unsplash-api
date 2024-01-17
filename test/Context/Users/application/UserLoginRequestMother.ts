import { type UserEmail } from '../../../../src/Context/Users/domain/UserEmail';
import { UserEmailMother } from '../domain/UserEmailMother';
import { PasswordMother } from '../../Shared/domain/PasswordMother';
import { type UserLoginRequest } from '../../../../src/Context/Users/application/login/UserLoginRequest';

export class UserLoginRequestMother {
  static create (email: UserEmail, password: string): UserLoginRequest {
    return { email: email.value, password };
  }

  static random (request?: { email?: string, password?: string }): UserLoginRequest {
    return this.create(
      request?.email ? UserEmailMother.create(request.email) : UserEmailMother.random(),
      request?.password ?? PasswordMother.random()
    );
  }
}
