import { test as base } from '@playwright/test';
import { UserClient } from '../api/clients/user.client';
import { UserService } from '../api/services/user.service';

type ApiFixtures = {
  userClient: UserClient;
  userService: UserService;
};

export const test = base.extend<ApiFixtures>({
  userClient: async ({ request, baseURL }, use) => {
    const client = new UserClient(request, baseURL!);
    await use(client);
  },

  userService: async ({ userClient }, use) => {
    const service = new UserService(userClient);
    await use(service);
  },
});

export { expect } from '@playwright/test';
