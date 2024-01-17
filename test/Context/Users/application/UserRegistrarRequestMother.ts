import { type UserRegistrarRequest } from '../../../../src/Context/Users/application/registrar/UserRegistrarRequest';
import { type UserEmail } from '../../../../src/Context/Users/domain/UserEmail';
import { type UserId } from '../../../../src/Context/Users/domain/UserId';
import { UserEmailMother } from '../domain/UserEmailMother';
import { UserIdMother } from '../domain/UserIdMother';
import { PasswordMother } from '../../Shared/domain/PasswordMother';

export class UserRegistrarRequestMother {
  static create (id: UserId, email: UserEmail, password: string): UserRegistrarRequest {
    return { id: id.value, email: email.value, password };
  }

  static random (request?: { email?: string }): UserRegistrarRequest {
    return this.create(UserIdMother.random(), request?.email ? UserEmailMother.create(request.email) : UserEmailMother.random(), PasswordMother.random());
  }
}
