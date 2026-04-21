# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: users\contract\user.contract.api.spec.ts >> Users API - Contract Scenarios @contract >> DELETE without authentication should match error contract
- Location: src\api\tests\users\contract\user.contract.api.spec.ts:47:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 401
Received: 204
```

# Test source

```ts
  1  | import { test, expect } from '../../../../fixtures/api.fixture';
  2  | import { UserFactory } from '../../../../test-data/user.factory';
  3  | import { validateSchema } from '../../../../core/utils/response.validator';
  4  | import { userSchema } from '../../../schemas/user.schema';
  5  | import { usersListSchema } from '../../../schemas/users-list.schema';
  6  | import { errorResponseSchema } from '../../../schemas/error-response.schema';
  7  | import { getEnvironmentFromProject } from '../../../../core/utils/test-context';
  8  | 
  9  | test.describe('Users API - Contract Scenarios @contract', () => {
  10 |   test('GET /users should match users list contract', async ({ userService }, testInfo) => {
  11 |     const environment = getEnvironmentFromProject(testInfo);
  12 | 
  13 |     const response = await userService.list(environment);
  14 | 
  15 |     expect(response.status()).toBe(200);
  16 |     expect(response.headers()['content-type']).toContain('application/json');
  17 | 
  18 |     const body = await response.json();
  19 |     validateSchema(usersListSchema, body);
  20 |   });
  21 | 
  22 |   test('POST /users should match user contract', async ({ userService }, testInfo) => {
  23 |     const environment = getEnvironmentFromProject(testInfo);
  24 |     const user = UserFactory.build();
  25 | 
  26 |     const response = await userService.create(environment, user);
  27 | 
  28 |     expect(response.status()).toBe(201);
  29 |     expect(response.headers()['content-type']).toContain('application/json');
  30 | 
  31 |     const body = await response.json();
  32 |     validateSchema(userSchema, body);
  33 |   });
  34 | 
  35 |   test('GET /users/{email} for unknown user should match error contract', async ({ userService }, testInfo) => {
  36 |     const environment = getEnvironmentFromProject(testInfo);
  37 | 
  38 |     const response = await userService.getByEmail(environment, 'notfound@example.com');
  39 | 
  40 |     expect(response.status()).toBe(404);
  41 |     expect(response.headers()['content-type']).toContain('application/json');
  42 | 
  43 |     const body = await response.json();
  44 |     validateSchema(errorResponseSchema, body);
  45 |   });
  46 | 
  47 |   test('DELETE without authentication should match error contract', async ({ userService }, testInfo) => {
  48 |     const environment = getEnvironmentFromProject(testInfo);
  49 |     const user = UserFactory.build();
  50 | 
  51 |     await userService.create(environment, user);
  52 | 
  53 |     const response = await userService.delete(environment, user.email);
  54 | 
> 55 |     expect(response.status()).toBe(401);
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  56 |     expect(response.headers()['content-type']).toContain('application/json');
  57 | 
  58 |     const body = await response.json();
  59 |     validateSchema(errorResponseSchema, body);
  60 |   });
  61 | });
```