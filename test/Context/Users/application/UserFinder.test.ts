import { UserFinder } from '../../../../src/Context/Users/application/finder/UserFinder';
import { UserEmail } from '../../../../src/Context/Users/domain/UserEmail';
import { UserRepositoryMock } from '../__mocks__/UserRepositoryMock';

let finder: UserFinder;
let repository: UserRepositoryMock;

beforeEach(() => {
  repository = new UserRepositoryMock();
  finder = new UserFinder(repository);
});

describe('User Finder', () => {
  test('Should find a user', async () => {
    const request = { email: 'test@gmail.com' };
    const email = new UserEmail(request.email);

    await finder.exec(request);
    repository.assertSearchByEmailHaveBeenCalledWith(email);
  });
});
