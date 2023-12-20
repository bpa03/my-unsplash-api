import { genSalt, hash } from 'bcrypt';
import { type Nullable } from '../../../Shared/domain/Nullable';
import { PrismaRepository } from '../../../Shared/infrastructure/persistence/prisma/PrismaRepository';
import { User } from '../../domain/User';
import { type UserEmail } from '../../domain/UserEmail';
import { type UserId } from '../../domain/UserId';
import { type UserRepository } from '../../domain/UserRepository';

export class PrismaUserRepository extends PrismaRepository implements UserRepository {
  async searchById (id: UserId): Promise<Nullable<User>> {
    const client = await this.client();

    const userId = id.value;
    const user = await client.user.findFirst({ where: { id: userId } });

    return user
      ? User.fromPrimitives({
        email: user.email,
        id: user.id,
        password: user.password,
        gender: user.gender as string,
        lastname: user.name
      })
      : null;
  };

  async searchByEmail (email: UserEmail): Promise<Nullable<User>> {
    const client = await this.client();

    const userEmail = email.value;
    const user = await client.user.findFirst({ where: { email: userEmail } });

    return user
      ? User.fromPrimitives({
        email: user.email,
        id: user.id,
        password: user.password,
        gender: user.gender as string,
        lastname: user.name
      })
      : null;
  };

  async create (user: User): Promise<void> {
    const client = await this.client();
    const data = user.toPrimitives();

    const salts = await genSalt(10);
    const hashed = await hash(data.password, salts);

    await client.user.create({
      data: {
        ...data,
        password: hashed
      }
    });
  };
}
