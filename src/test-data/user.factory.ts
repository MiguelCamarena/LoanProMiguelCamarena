import { User } from '../core/types/user.types';
import { uniqueId } from '../core/utils/random';

export class UserFactory {
  static build(overrides?: Partial<User>): User {
    const unique = uniqueId();

    return {
      name: `User ${unique}`,
      email: `user.${unique}@example.com`,
      age: 30,
      ...overrides,
    };
  }
}
