import { test, expect } from '../../../../fixtures/api.fixture';
import { UserFactory } from '../../../../test-data/user.factory';
import { validateSchema } from '../../../../core/utils/response.validator';
import { errorResponseSchema } from '../../../schemas/error-response.schema';
import { getEnvironmentFromProject } from '../../../../core/utils/test-context';

test.describe('Users API - Boundary Scenarios @boundary', () => {
  // Test: Validates that the minimum allowed age value (1) is accepted when creating a user
  test('should allow age = 1', async ({ userService }, testInfo) => {
    const environment = getEnvironmentFromProject(testInfo);
    const user = UserFactory.build({ age: 1 });

    const response = await userService.create(environment, user);
    expect(response.status()).toBe(201);
  });

  // Test: Validates that the maximum allowed age value (150) is accepted when creating a user
  test('should allow age = 150', async ({ userService }, testInfo) => {
    const environment = getEnvironmentFromProject(testInfo);
    const user = UserFactory.build({ age: 150 });

    const response = await userService.create(environment, user);
    expect(response.status()).toBe(201);
  });

  // Test: Validates that age value of 0 (below the minimum) is rejected with a 400 error
  test('should reject age = 0', async ({ userService }, testInfo) => {
    const environment = getEnvironmentFromProject(testInfo);
    const user = UserFactory.build({ age: 0 });

    const response = await userService.create(environment, user);
    expect(response.status()).toBe(400);

    const body = await response.json();
    validateSchema(errorResponseSchema, body);
  });

  // Test: Validates that age value of 151 (above the maximum) is rejected with a 400 error
  test('should reject age = 151', async ({ userService }, testInfo) => {
    const environment = getEnvironmentFromProject(testInfo);
    const user = UserFactory.build({ age: 151 });

    const response = await userService.create(environment, user);
    expect(response.status()).toBe(400);

    const body = await response.json();
    validateSchema(errorResponseSchema, body);
  });

  // Test: Validates that an empty name is rejected when creating a user
  test('should reject empty name', async ({ userService }, testInfo) => {
    const environment = getEnvironmentFromProject(testInfo);
    const user = UserFactory.build({ name: '' });

    const response = await userService.create(environment, user);
    expect(response.status()).toBe(400);

    const body = await response.json();
    validateSchema(errorResponseSchema, body);
  });
});