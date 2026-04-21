# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: users\positive\user.positive.api.spec.ts >> Users API - Positive Scenarios @positive >> should delete an existing user with valid auth token
- Location: src\api\tests\users\positive\user.positive.api.spec.ts:76:7

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
  10 |   // Test: Validates that listing all users returns a 200 status code and valid users list
  11 |   test('should list users successfully', async ({ userService }, testInfo) => {
  12 |     const environment = getEnvironmentFromProject(testInfo);
  13 |     const response = await userService.list(environment);
  14 | 
  15 |     expect(response.status()).toBe(200);
  16 | 
  17 |     const body = await response.json();
  18 |     validateSchema(usersListSchema, body);
  19 |   });
  20 | 
  21 |   // Test: Validates that creating a new user with valid data returns a 201 status and the created user data matches the request
  22 |   test('should create a valid user successfully', async ({ userService }, testInfo) => {
  23 |     const environment = getEnvironmentFromProject(testInfo);
  24 |     const user = UserFactory.build();
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
  37 |   // Test: Validates that retrieving an existing user by email returns the correct user data
  38 |   test('should get an existing user by email', async ({ userService }, testInfo) => {
  39 |     const environment = getEnvironmentFromProject(testInfo);
  40 |     const user = UserFactory.build();
  41 | 
  42 |     await userService.create(environment, user);
  43 | 
  44 |     const response = await userService.getByEmail(environment, user.email);
  45 | 
  46 |     expect(response.status()).toBe(200);
  47 | 
  48 |     const body = await response.json();
  49 |     validateSchema(userSchema, body);
  50 |     expect(body.email).toBe(user.email);
  51 |   });
  52 | 
  53 |   // Test: Validates that updating a user's data returns a 200 status and the updated information is persisted
  54 |   test('should update an existing user successfully', async ({ userService }, testInfo) => {
  55 |     const environment = getEnvironmentFromProject(testInfo);
  56 |     const user = UserFactory.build();
  57 | 
  58 |     await userService.create(environment, user);
  59 | 
  60 |     const updatedPayload = {
  61 |       ...user,
  62 |       name: 'Updated Name',
  63 |       age: 35,
  64 |     };
  65 | 
  66 |     const response = await userService.update(environment, user.email, updatedPayload);
  67 |     expect(response.status()).toBe(200);
  68 | 
  69 |     const body = await response.json();
  70 |     validateSchema(userSchema, body);
  71 |     expect(body.name).toBe('Updated Name');
  72 |     expect(body.age).toBe(35);
  73 |   });
  74 | 
  75 |   // Test: Validates that deleting a user with a valid authentication token succeeds and the user is no longer retrievable
  76 |   test('should delete an existing user with valid auth token', async ({ userService }, testInfo) => {
  77 |     const environment = getEnvironmentFromProject(testInfo);
  78 |     const user = UserFactory.build();
  79 | 
  80 |     await userService.create(environment, user);
  81 | 
  82 |     const deleteResponse = await userService.delete(environment, user.email, authFixture.token);
  83 |     expect(deleteResponse.status()).toBe(204);
  84 | 
  85 |     const getResponse = await userService.getByEmail(environment, user.email);
> 86 |     expect(getResponse.status()).toBe(404);
     |                                  ^ Error: expect(received).toBe(expected) // Object.is equality
  87 |   });
  88 | });
```