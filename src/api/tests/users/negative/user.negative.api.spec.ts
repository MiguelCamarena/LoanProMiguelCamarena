import { test, expect } from '../../../../fixtures/api.fixture';
import { UserFactory } from '../../../../test-data/user.factory';
import { invalidUsers } from '../../../../test-data/user.data';
import { validateSchema } from '../../../../core/utils/response.validator';
import { errorResponseSchema } from '../../../schemas/error-response.schema';
import { getEnvironmentFromProject } from '../../../../core/utils/test-context';

test.describe('Users API - Negative Scenarios @negative', () => {
  // Test: Validates that creating a user with an invalid email format returns a 400 error
  test('should return 400 when creating user with invalid email', async ({ userService }, testInfo) => {
    const environment = getEnvironmentFromProject(testInfo);

    const response = await userService.create(environment, invalidUsers.invalidEmail);

    expect(response.status()).toBe(400);

    const body = await response.json();
    validateSchema(errorResponseSchema, body);
  });

  // Test: Validates that attempting to create a user with a duplicate email returns a 409 conflict error
  test('should return 409 when creating a duplicate user', async ({ userService }, testInfo) => {
    const environment = getEnvironmentFromProject(testInfo);
    const user = UserFactory.build();

    await userService.create(environment, user);
    const duplicateResponse = await userService.create(environment, user);

    expect(duplicateResponse.status()).toBe(409);

    const body = await duplicateResponse.json();
    validateSchema(errorResponseSchema, body);
  });

  // Test: Validates that retrieving a non-existent user returns a 404 not found error
  test('should return 404 when getting a non-existing user', async ({ userService }, testInfo) => {
    const environment = getEnvironmentFromProject(testInfo);

    const response = await userService.getByEmail(environment, 'ghost.user@example.com');

    expect(response.status()).toBe(404);

    const body = await response.json();
    validateSchema(errorResponseSchema, body);
  });

  // Test: Validates that updating a non-existent user returns a 404 not found error
  test('should return 404 when updating a non-existing user', async ({ userService }, testInfo) => {
    const environment = getEnvironmentFromProject(testInfo);
    const user = UserFactory.build();

    const response = await userService.update(environment, user.email, user);

    expect(response.status()).toBe(404);

    const body = await response.json();
    validateSchema(errorResponseSchema, body);
  });

  // Test: Validates that deleting a user without an authentication token returns a 401 unauthorized error
  test('should return 401 when deleting without auth token', async ({ userService }, testInfo) => {
    const environment = getEnvironmentFromProject(testInfo);
    const user = UserFactory.build();

    await userService.create(environment, user);

    const response = await userService.delete(environment, user.email);

    expect(response.status()).toBe(401);

    const body = await response.json();
    validateSchema(errorResponseSchema, body);
  });

  // Test: Validates that deleting a user with an invalid authentication token returns a 401 unauthorized error
  test('should return 401 when deleting with invalid token', async ({ userService }, testInfo) => {
    const environment = getEnvironmentFromProject(testInfo);
    const user = UserFactory.build();

    await userService.create(environment, user);

    const response = await userService.delete(environment, user.email, 'badtoken');

    expect(response.status()).toBe(401);

    const body = await response.json();
    validateSchema(errorResponseSchema, body);
  });
});