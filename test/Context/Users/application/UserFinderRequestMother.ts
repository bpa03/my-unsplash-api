import { type UserFinderRequest } from '../../../../src/Context/Users/application/finder/UserFinderRequest';
import { type UserEmail } from '../../../../src/Context/Users/domain/UserEmail';
import { UserEmailMother } from '../domain/UserEmailMother';

export class UserFinderRequestMother {
  static create (email: UserEmail): UserFinderRequest {
    return { email: email.value };
  }

  static random (): UserFinderRequest {
    return this.create(UserEmailMother.random());
  }
}
