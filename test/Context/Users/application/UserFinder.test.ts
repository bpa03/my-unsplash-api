import { UserFinder } from '../../../../src/Context/Users/application/finder/UserFinder';
import { UserRepositoryMock } from '../__mocks__/UserRepositoryMock';
import { UserEmailMother } from '../domain/UserEmailMother';
import { UserFinderRequestMother } from './UserFinderRequestMother';

let finder: UserFinder;
let repository: UserRepositoryMock;

beforeEach(() => {
  repository = new UserRepositoryMock();
  finder = new UserFinder(repository);
});

describe('User Finder', () => {
  test('Should find a user', async () => {
    const request = UserFinderRequestMother.random();
    const email = UserEmailMother.create(request.email);

    await finder.exec(request);
    repository.assertSearchByEmailHaveBeenCalledWith(email);
  });
});
