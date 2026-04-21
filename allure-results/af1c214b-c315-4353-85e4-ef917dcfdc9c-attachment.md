# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: users\negative\user.negative.api.spec.ts >> Users API - Negative Scenarios @negative >> should return 409 when creating a duplicate user
- Location: src\api\tests\users\negative\user.negative.api.spec.ts:20:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 409
Received: 500
```

# Test source

```ts
  1  | import { test, expect } from '../../../../fixtures/api.fixture';
  2  | import { UserFactory } from '../../../../test-data/user.factory';
  3  | import { invalidUsers } from '../../../../test-data/user.data';
  4  | import { validateSchema } from '../../../../core/utils/response.validator';
  5  | import { errorResponseSchema } from '../../../schemas/error-response.schema';
  6  | import { getEnvironmentFromProject } from '../../../../core/utils/test-context';
  7  | 
  8  | test.describe('Users API - Negative Scenarios @negative', () => {
  9  |   test('should return 400 when creating user with invalid email', async ({ userService }, testInfo) => {
  10 |     const environment = getEnvironmentFromProject(testInfo);
  11 | 
  12 |     const response = await userService.create(environment, invalidUsers.invalidEmail);
  13 | 
  14 |     expect(response.status()).toBe(400);
  15 | 
  16 |     const body = await response.json();
  17 |     validateSchema(errorResponseSchema, body);
  18 |   });
  19 | 
  20 |   test('should return 409 when creating a duplicate user', async ({ userService }, testInfo) => {
  21 |     const environment = getEnvironmentFromProject(testInfo);
  22 |     const user = UserFactory.build();
  23 | 
  24 |     await userService.create(environment, user);
  25 |     const duplicateResponse = await userService.create(environment, user);
  26 | 
> 27 |     expect(duplicateResponse.status()).toBe(409);
     |                                        ^ Error: expect(received).toBe(expected) // Object.is equality
  28 | 
  29 |     const body = await duplicateResponse.json();
  30 |     validateSchema(errorResponseSchema, body);
  31 |   });
  32 | 
  33 |   test('should return 404 when getting a non-existing user', async ({ userService }, testInfo) => {
  34 |     const environment = getEnvironmentFromProject(testInfo);
  35 | 
  36 |     const response = await userService.getByEmail(environment, 'ghost.user@example.com');
  37 | 
  38 |     expect(response.status()).toBe(404);
  39 | 
  40 |     const body = await response.json();
  41 |     validateSchema(errorResponseSchema, body);
  42 |   });
  43 | 
  44 |   test('should return 404 when updating a non-existing user', async ({ userService }, testInfo) => {
  45 |     const environment = getEnvironmentFromProject(testInfo);
  46 |     const user = UserFactory.build();
  47 | 
  48 |     const response = await userService.update(environment, user.email, user);
  49 | 
  50 |     expect(response.status()).toBe(404);
  51 | 
  52 |     const body = await response.json();
  53 |     validateSchema(errorResponseSchema, body);
  54 |   });
  55 | 
  56 |   test('should return 401 when deleting without auth token', async ({ userService }, testInfo) => {
  57 |     const environment = getEnvironmentFromProject(testInfo);
  58 |     const user = UserFactory.build();
  59 | 
  60 |     await userService.create(environment, user);
  61 | 
  62 |     const response = await userService.delete(environment, user.email);
  63 | 
  64 |     expect(response.status()).toBe(401);
  65 | 
  66 |     const body = await response.json();
  67 |     validateSchema(errorResponseSchema, body);
  68 |   });
  69 | 
  70 |   test('should return 401 when deleting with invalid token', async ({ userService }, testInfo) => {
  71 |     const environment = getEnvironmentFromProject(testInfo);
  72 |     const user = UserFactory.build();
  73 | 
  74 |     await userService.create(environment, user);
  75 | 
  76 |     const response = await userService.delete(environment, user.email, 'badtoken');
  77 | 
  78 |     expect(response.status()).toBe(401);
  79 | 
  80 |     const body = await response.json();
  81 |     validateSchema(errorResponseSchema, body);
  82 |   });
  83 | });
```