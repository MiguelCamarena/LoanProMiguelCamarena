import { test, expect } from '../../../../fixtures/api.fixture';
import { UserFactory } from '../../../../test-data/user.factory';
import { validateSchema } from '../../../../core/utils/response.validator';
import { userSchema } from '../../../schemas/user.schema';
import { usersListSchema } from '../../../schemas/users-list.schema';
import { errorResponseSchema } from '../../../schemas/error-response.schema';
import { getEnvironmentFromProject } from '../../../../core/utils/test-context';

test.describe('Users API - Contract Scenarios @contract', () => {
  // Test: Validates that the GET /users endpoint returns data matching the expected users list contract
  test('GET /users should match users list contract', async ({ userService }, testInfo) => {
    const environment = getEnvironmentFromProject(testInfo);

    const response = await userService.list(environment);

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const body = await response.json();
    validateSchema(usersListSchema, body);
  });

  // Test: Validates that the POST /users endpoint returns a created user matching the expected user contract
  test('POST /users should match user contract', async ({ userService }, testInfo) => {
    const environment = getEnvironmentFromProject(testInfo);
    const user = UserFactory.build();

    const response = await userService.create(environment, user);

    expect(response.status()).toBe(201);
    expect(response.headers()['content-type']).toContain('application/json');

    const body = await response.json();
    validateSchema(userSchema, body);
  });

  // Test: Validates that retrieving a non-existent user returns an error response matching the expected error contract
  test('GET /users/{email} for unknown user should match error contract', async ({ userService }, testInfo) => {
    const environment = getEnvironmentFromProject(testInfo);

    const response = await userService.getByEmail(environment, 'notfound@example.com');

    expect(response.status()).toBe(404);
    expect(response.headers()['content-type']).toContain('application/json');

    const body = await response.json();
    validateSchema(errorResponseSchema, body);
  });

  // Test: Validates that deleting a user without authentication returns an error response matching the expected error contract
  test('DELETE without authentication should match error contract', async ({ userService }, testInfo) => {
    const environment = getEnvironmentFromProject(testInfo);
    const user = UserFactory.build();

    await userService.create(environment, user);

    const response = await userService.delete(environment, user.email);

    expect(response.status()).toBe(401);
    expect(response.headers()['content-type']).toContain('application/json');

    const body = await response.json();
    validateSchema(errorResponseSchema, body);
  });
});