# Bugs Found

Use this file to document discrepancies between the OpenAPI specification and the actual API behavior.

## Summary
- **Total Bugs:** 6
- **Tests Affected:** 14 failed tests
- **Environments:** dev / prod (both affected)

### Bug Impact Overview
| Bug | Affected Tests | Severity |
|-----|----------------|----------|
| BUG-001: DELETE without Auth returns 204 | 3 tests | 🔴 CRITICAL |
| BUG-002: POST accepts invalid email | 2 tests | 🟠 HIGH |
| BUG-003: Duplicate user returns 500 | 2 tests | 🟠 HIGH |
| BUG-004: GET non-existing user returns 500 | 4 tests | 🟠 HIGH |
| BUG-005: GET /users has invalid email | 1 test | 🟠 HIGH |
| BUG-006: GET after DELETE returns 500 | 2 tests | 🟠 HIGH |
| BUG-007: Missing authentication enforcement across endpoints | Possible 2 tests | 🔴 CRITICAL |

## BUG-001 - DELETE without Authentication returns 204 instead of 401
**Environment:** dev / prod  
**Endpoint:** DELETE /{env}/users/{email}  
**Affects:** 3 tests (api-dev contract, api-dev negative, api-prod negative)

### Expected
According to the OpenAPI spec, the endpoint must return 401 (Unauthorized) when the Authentication header is missing or invalid.

### Actual
The endpoint returns 204 (No Content) and successfully deletes the user without authentication validation.

### Steps to Reproduce
1. Create a valid user.
2. Send DELETE request without Authentication header.
3. Observe response - returns 204 instead of 401.
4. Verify user was deleted (can be confirmed by subsequent GET request).

### Impact
Unauthorized deletion is possible. Any unauthenticated user can delete any user in the system, which is a critical security vulnerability.

### Failing Tests
- Users API - Contract Scenarios @contract › DELETE without authentication should match error contract (api-dev)
- Users API - Negative Scenarios @negative › should return 401 when deleting without auth token (api-dev)
- Users API - Negative Scenarios @negative › should return 401 when deleting with invalid token (api-dev)

---

## BUG-002 - POST /users accepts invalid email format
**Environment:** dev / prod  
**Endpoint:** POST /{env}/users  
**Affects:** 2 tests (api-dev negative, api-prod negative)

### Expected
The spec requires email validation. Invalid email formats should return 400 (Bad Request).

### Actual
The endpoint returns 201 (Created) and accepts users with invalid email addresses.

### Steps to Reproduce
1. Send POST /users with invalidEmail: "invalidemail" (without @ symbol).
2. Observe response returns 201 instead of 400.

### Impact
Invalid email records can be persisted in the database, affecting data integrity and downstream processes that rely on valid email formats.

### Failing Tests
- Users API - Negative Scenarios @negative › should return 400 when creating user with invalid email (api-dev)
- Users API - Negative Scenarios @negative › should return 400 when creating user with invalid email (api-prod)

---

## BUG-003 - POST /users for duplicate user returns 500 instead of 409
**Environment:** dev / prod  
**Endpoint:** POST /{env}/users  
**Affects:** 2 tests (api-dev negative, api-prod negative)

### Expected
According to the OpenAPI spec, duplicate user creation should return 409 (Conflict).

### Actual
The endpoint returns 500 (Internal Server Error) when attempting to create a duplicate user.

### Steps to Reproduce
1. Create a user with email: test@example.com
2. Attempt to create another user with the same email.
3. Observe response returns 500 instead of 409.

### Impact
The API fails ungracefully instead of providing a proper conflict response. Clients cannot distinguish between server errors and business logic conflicts.

### Failing Tests
- Users API - Negative Scenarios @negative › should return 409 when creating a duplicate user (api-dev)
- Users API - Negative Scenarios @negative › should return 409 when creating a duplicate user (api-prod)

---

## BUG-004 - GET /users/{email} for non-existing user returns 500 instead of 404
**Environment:** dev / prod  
**Endpoint:** GET /{env}/users/{email}  
**Affects:** 4 tests (api-dev contract, api-dev negative, api-prod contract, api-prod negative)

### Expected
According to the OpenAPI spec, requesting a non-existing user should return 404 (Not Found).

### Actual
The endpoint returns 500 (Internal Server Error) when the user does not exist.

### Steps to Reproduce
1. Send GET /users/notfound@example.com (where user does not exist).
2. Observe response returns 500 instead of 404.

### Impact
The API fails ungracefully. Clients cannot properly handle the case where a user does not exist, making it difficult to build reliable applications.

### Failing Tests
- Users API - Contract Scenarios @contract › GET /users/{email} for unknown user should match error contract (api-dev)
- Users API - Negative Scenarios @negative › should return 404 when getting a non-existing user (api-dev)
- Users API - Contract Scenarios @contract › GET /users/{email} for unknown user should match error contract (api-prod)
- Users API - Negative Scenarios @negative › should return 404 when getting a non-existing user (api-prod)

---

## BUG-005 - GET /users response contains invalid email data
**Environment:** dev  
**Endpoint:** GET /{env}/users  
**Affects:** 1 test (api-dev contract)

### Expected
All users returned should have valid email addresses according to the schema.

### Actual
The GET /users endpoint returns at least one user with an invalid email format that fails Zod schema validation (invalid_string error at path [7, "email"]).

### Steps to Reproduce
1. Send GET /users request.
2. Validate response against usersListSchema using Zod.
3. Observe validation error on user at index 7, property "email".

### Impact
Response contract validation fails. Data integrity issue - invalid data exists in the database or is being returned by the API.

### Failing Tests
- Users API - Contract Scenarios @contract › GET /users should match users list contract (api-dev)

---

## BUG-006 - GET /users/{email} after DELETE returns 500 instead of 404
**Environment:** dev / prod  
**Endpoint:** GET /{env}/users/{email}  
**Affects:** 2 tests (api-dev positive, api-prod positive)

### Expected
After successfully deleting a user (204 response), subsequent GET request for that user should return 404 (Not Found).

### Actual
The GET request after DELETE returns 500 (Internal Server Error) instead of 404.

### Steps to Reproduce
1. Create a user.
2. Delete the user with valid authentication token (receives 204).
3. Send GET request for the deleted user.
4. Observe response returns 500 instead of 404.

### Impact
The API fails ungracefully after deletion. Clients cannot verify that a user was successfully deleted.

### Failing Tests
- Users API - Positive Scenarios @positive › should delete an existing user with valid auth token (api-dev)
- Users API - Positive Scenarios @positive › should delete an existing user with valid auth token (api-prod)

---

## BUG-007 - API endpoints do not consistently enforce authentication (Missing Token Validation)
**Environment:** dev / prod  
**Endpoint:** Multiple (GET /users, POST /users, PUT /users, DELETE /users)  
**Affects:** possible 2 tests (api-dev negative, api-prod negative)

### Expected
According to the OpenAPI spec and standard API security practices, all endpoints that access or modify user data should require a valid authentication token (Authorization header).

### Actual
Authentication enforcement is inconsistent:

### Steps to Reproduce
1. Send requests (GET, POST, PUT, DELETE) without Authorization header.
2. Observe that some endpoints still return success responses (200 / 201 / 204).
3. Repeat with NO token.

### Impact
Critical security vulnerability:

- Unauthorized users can access  
- API does not enforce consistent authentication policy  
- Violates standard API security practices  

### Failing Tests
- Users API - Negative Scenarios @negative › should require authentication token for all endpoints (api-dev)
- Users API - Negative Scenarios @negative › should require authentication token for all endpoints (api-prod)