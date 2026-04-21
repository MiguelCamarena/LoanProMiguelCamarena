# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: users\negative\user.negative.api.spec.ts >> Users API - Negative Scenarios @negative >> should return 401 when deleting without auth token
- Location: src\api\tests\users\negative\user.negative.api.spec.ts:61:7

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
  3  | import { invalidUsers } from '../../../../test-data/user.data';
  4  | import { validateSchema } from '../../../../core/utils/response.validator';
  5  | import { errorResponseSchema } from '../../../schemas/error-response.schema';
  6  | import { getEnvironmentFromProject } from '../../../../core/utils/test-context';
  7  | 
  8  | test.describe('Users API - Negative Scenarios @negative', () => {
  9  |   // Test: Validates that creating a user with an invalid email format returns a 400 error
  10 |   test('should return 400 when creating user with invalid email', async ({ userService }, testInfo) => {
  11 |     const environment = getEnvironmentFromProject(testInfo);
  12 | 
  13 |     const response = await userService.create(environment, invalidUsers.invalidEmail);
  14 | 
  15 |     expect(response.status()).toBe(400);
  16 | 
  17 |     const body = await response.json();
  18 |     validateSchema(errorResponseSchema, body);
  19 |   });
  20 | 
  21 |   // Test: Validates that attempting to create a user with a duplicate email returns a 409 conflict error
  22 |   test('should return 409 when creating a duplicate user', async ({ userService }, testInfo) => {
  23 |     const environment = getEnvironmentFromProject(testInfo);
  24 |     const user = UserFactory.build();
  25 | 
  26 |     await userService.create(environment, user);
  27 |     const duplicateResponse = await userService.create(environment, user);
  28 | 
  29 |     expect(duplicateResponse.status()).toBe(409);
  30 | 
  31 |     const body = await duplicateResponse.json();
  32 |     validateSchema(errorResponseSchema, body);
  33 |   });
  34 | 
  35 |   // Test: Validates that retrieving a non-existent user returns a 404 not found error
  36 |   test('should return 404 when getting a non-existing user', async ({ userService }, testInfo) => {
  37 |     const environment = getEnvironmentFromProject(testInfo);
  38 | 
  39 |     const response = await userService.getByEmail(environment, 'ghost.user@example.com');
  40 | 
  41 |     expect(response.status()).toBe(404);
  42 | 
  43 |     const body = await response.json();
  44 |     validateSchema(errorResponseSchema, body);
  45 |   });
  46 | 
  47 |   // Test: Validates that updating a non-existent user returns a 404 not found error
  48 |   test('should return 404 when updating a non-existing user', async ({ userService }, testInfo) => {
  49 |     const environment = getEnvironmentFromProject(testInfo);
  50 |     const user = UserFactory.build();
  51 | 
  52 |     const response = await userService.update(environment, user.email, user);
  53 | 
  54 |     expect(response.status()).toBe(404);
  55 | 
  56 |     const body = await response.json();
  57 |     validateSchema(errorResponseSchema, body);
  58 |   });
  59 | 
  60 |   // Test: Validates that deleting a user without an authentication token returns a 401 unauthorized error
  61 |   test('should return 401 when deleting without auth token', async ({ userService }, testInfo) => {
  62 |     const environment = getEnvironmentFromProject(testInfo);
  63 |     const user = UserFactory.build();
  64 | 
  65 |     await userService.create(environment, user);
  66 | 
  67 |     const response = await userService.delete(environment, user.email);
  68 | 
> 69 |     expect(response.status()).toBe(401);
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  70 | 
  71 |     const body = await response.json();
  72 |     validateSchema(errorResponseSchema, body);
  73 |   });
  74 | 
  75 |   // Test: Validates that deleting a user with an invalid authentication token returns a 401 unauthorized error
  76 |   test('should return 401 when deleting with invalid token', async ({ userService }, testInfo) => {
  77 |     const environment = getEnvironmentFromProject(testInfo);
  78 |     const user = UserFactory.build();
  79 | 
  80 |     await userService.create(environment, user);
  81 | 
  82 |     const response = await userService.delete(environment, user.email, 'badtoken');
  83 | 
  84 |     expect(response.status()).toBe(401);
  85 | 
  86 |     const body = await response.json();
  87 |     validateSchema(errorResponseSchema, body);
  88 |   });
  89 | });
```