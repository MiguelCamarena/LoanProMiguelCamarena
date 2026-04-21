import { test, expect } from '../../../../fixtures/api.fixture';
import { UserFactory } from '../../../../test-data/user.factory';
import { validateSchema } from '../../../../core/utils/response.validator';
import { userSchema } from '../../../schemas/user.schema';
import { usersListSchema } from '../../../schemas/users-list.schema';
import { authFixture } from '../../../../fixtures/auth.fixture';
import { getEnvironmentFromProject } from '../../../../core/utils/test-context';

test.describe('Users API - Positive Scenarios @positive', () => {
  // Test: Validates that listing all users returns a 200 status code and valid users list
  test('should list users successfully', async ({ userService }, testInfo) => {
    const environment = getEnvironmentFromProject(testInfo);
    const response = await userService.list(environment);

    expect(response.status()).toBe(200);

    const body = await response.json();
    validateSchema(usersListSchema, body);
  });

  // Test: Validates that creating a new user with valid data returns a 201 status and the created user data matches the request
  test('should create a valid user successfully', async ({ userService }, testInfo) => {
    const environment = getEnvironmentFromProject(testInfo);
    const user = UserFactory.build();
    const response = await userService.create(environment, user);

    expect(response.status()).toBe(201);

    const body = await response.json();
    validateSchema(userSchema, body);

    expect(body.email).toBe(user.email);
    expect(body.name).toBe(user.name);
    expect(body.age).toBe(user.age);
  });

  // Test: Validates that retrieving an existing user by email returns the correct user data
  test('should get an existing user by email', async ({ userService }, testInfo) => {
    const environment = getEnvironmentFromProject(testInfo);
    const user = UserFactory.build();

    await userService.create(environment, user);

    const response = await userService.getByEmail(environment, user.email);

    expect(response.status()).toBe(200);

    const body = await response.json();
    validateSchema(userSchema, body);
    expect(body.email).toBe(user.email);
  });

  // Test: Validates that updating a user's data returns a 200 status and the updated information is persisted
  test('should update an existing user successfully', async ({ userService }, testInfo) => {
    const environment = getEnvironmentFromProject(testInfo);
    const user = UserFactory.build();

    await userService.create(environment, user);

    const updatedPayload = {
      ...user,
      name: 'Updated Name',
      age: 35,
    };

    const response = await userService.update(environment, user.email, updatedPayload);
    expect(response.status()).toBe(200);

    const body = await response.json();
    validateSchema(userSchema, body);
    expect(body.name).toBe('Updated Name');
    expect(body.age).toBe(35);
  });

  // Test: Validates that deleting a user with a valid authentication token succeeds and the user is no longer retrievable
  test('should delete an existing user with valid auth token', async ({ userService }, testInfo) => {
    const environment = getEnvironmentFromProject(testInfo);
    const user = UserFactory.build();

    await userService.create(environment, user);

    const deleteResponse = await userService.delete(environment, user.email, authFixture.token);
    expect(deleteResponse.status()).toBe(204);

    const getResponse = await userService.getByEmail(environment, user.email);
    expect(getResponse.status()).toBe(404);
  });
});