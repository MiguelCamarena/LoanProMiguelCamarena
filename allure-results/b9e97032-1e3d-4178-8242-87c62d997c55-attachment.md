# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: users\contract\user.contract.api.spec.ts >> Users API - Contract Scenarios @contract >> GET /users/{email} for unknown user should match error contract
- Location: src\api\tests\users\contract\user.contract.api.spec.ts:38:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 404
Received: 500
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
  10 |   // Test: Validates that the GET /users endpoint returns data matching the expected users list contract
  11 |   test('GET /users should match users list contract', async ({ userService }, testInfo) => {
  12 |     const environment = getEnvironmentFromProject(testInfo);
  13 | 
  14 |     const response = await userService.list(environment);
  15 | 
  16 |     expect(response.status()).toBe(200);
  17 |     expect(response.headers()['content-type']).toContain('application/json');
  18 | 
  19 |     const body = await response.json();
  20 |     validateSchema(usersListSchema, body);
  21 |   });
  22 | 
  23 |   // Test: Validates that the POST /users endpoint returns a created user matching the expected user contract
  24 |   test('POST /users should match user contract', async ({ userService }, testInfo) => {
  25 |     const environment = getEnvironmentFromProject(testInfo);
  26 |     const user = UserFactory.build();
  27 | 
  28 |     const response = await userService.create(environment, user);
  29 | 
  30 |     expect(response.status()).toBe(201);
  31 |     expect(response.headers()['content-type']).toContain('application/json');
  32 | 
  33 |     const body = await response.json();
  34 |     validateSchema(userSchema, body);
  35 |   });
  36 | 
  37 |   // Test: Validates that retrieving a non-existent user returns an error response matching the expected error contract
  38 |   test('GET /users/{email} for unknown user should match error contract', async ({ userService }, testInfo) => {
  39 |     const environment = getEnvironmentFromProject(testInfo);
  40 | 
  41 |     const response = await userService.getByEmail(environment, 'notfound@example.com');
  42 | 
> 43 |     expect(response.status()).toBe(404);
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  44 |     expect(response.headers()['content-type']).toContain('application/json');
  45 | 
  46 |     const body = await response.json();
  47 |     validateSchema(errorResponseSchema, body);
  48 |   });
  49 | 
  50 |   // Test: Validates that deleting a user without authentication returns an error response matching the expected error contract
  51 |   test('DELETE without authentication should match error contract', async ({ userService }, testInfo) => {
  52 |     const environment = getEnvironmentFromProject(testInfo);
  53 |     const user = UserFactory.build();
  54 | 
  55 |     await userService.create(environment, user);
  56 | 
  57 |     const response = await userService.delete(environment, user.email);
  58 | 
  59 |     expect(response.status()).toBe(401);
  60 |     expect(response.headers()['content-type']).toContain('application/json');
  61 | 
  62 |     const body = await response.json();
  63 |     validateSchema(errorResponseSchema, body);
  64 |   });
  65 | });
```