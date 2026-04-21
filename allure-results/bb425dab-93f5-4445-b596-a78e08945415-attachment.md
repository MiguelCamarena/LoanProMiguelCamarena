# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: users\positive\user.positive.api.spec.ts >> Users API - Positive Scenarios @positive >> should delete an existing user with valid auth token
- Location: src\api\tests\users\positive\user.positive.api.spec.ts:74:7

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
  6  | import { authFixture } from '../../../../fixtures/auth.fixture';
  7  | import { getEnvironmentFromProject } from '../../../../core/utils/test-context';
  8  | 
  9  | test.describe('Users API - Positive Scenarios @positive', () => {
  10 |   test('should list users successfully', async ({ userService }, testInfo) => {
  11 |     const environment = getEnvironmentFromProject(testInfo);
  12 | 
  13 |     const response = await userService.list(environment);
  14 | 
  15 |     expect(response.status()).toBe(200);
  16 | 
  17 |     const body = await response.json();
  18 |     validateSchema(usersListSchema, body);
  19 |   });
  20 | 
  21 |   test('should create a valid user successfully', async ({ userService }, testInfo) => {
  22 |     const environment = getEnvironmentFromProject(testInfo);
  23 |     const user = UserFactory.build();
  24 | 
  25 |     const response = await userService.create(environment, user);
  26 | 
  27 |     expect(response.status()).toBe(201);
  28 | 
  29 |     const body = await response.json();
  30 |     validateSchema(userSchema, body);
  31 | 
  32 |     expect(body.email).toBe(user.email);
  33 |     expect(body.name).toBe(user.name);
  34 |     expect(body.age).toBe(user.age);
  35 |   });
  36 | 
  37 |   test('should get an existing user by email', async ({ userService }, testInfo) => {
  38 |     const environment = getEnvironmentFromProject(testInfo);
  39 |     const user = UserFactory.build();
  40 | 
  41 |     await userService.create(environment, user);
  42 | 
  43 |     const response = await userService.getByEmail(environment, user.email);
  44 | 
  45 |     expect(response.status()).toBe(200);
  46 | 
  47 |     const body = await response.json();
  48 |     validateSchema(userSchema, body);
  49 |     expect(body.email).toBe(user.email);
  50 |   });
  51 | 
  52 |   test('should update an existing user successfully', async ({ userService }, testInfo) => {
  53 |     const environment = getEnvironmentFromProject(testInfo);
  54 |     const user = UserFactory.build();
  55 | 
  56 |     await userService.create(environment, user);
  57 | 
  58 |     const updatedPayload = {
  59 |       ...user,
  60 |       name: 'Updated Name',
  61 |       age: 35,
  62 |     };
  63 | 
  64 |     const response = await userService.update(environment, user.email, updatedPayload);
  65 | 
  66 |     expect(response.status()).toBe(200);
  67 | 
  68 |     const body = await response.json();
  69 |     validateSchema(userSchema, body);
  70 |     expect(body.name).toBe('Updated Name');
  71 |     expect(body.age).toBe(35);
  72 |   });
  73 | 
  74 |   test('should delete an existing user with valid auth token', async ({ userService }, testInfo) => {
  75 |     const environment = getEnvironmentFromProject(testInfo);
  76 |     const user = UserFactory.build();
  77 | 
  78 |     await userService.create(environment, user);
  79 | 
  80 |     const deleteResponse = await userService.delete(environment, user.email, authFixture.token);
  81 |     expect(deleteResponse.status()).toBe(204);
  82 | 
  83 |     const getResponse = await userService.getByEmail(environment, user.email);
> 84 |     expect(getResponse.status()).toBe(404);
     |                                  ^ Error: expect(received).toBe(expected) // Object.is equality
  85 |   });
  86 | });
```