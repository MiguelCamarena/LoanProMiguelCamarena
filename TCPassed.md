# Passed Test Cases

## Summary
- **Total Passed:** 28 out of 42
- **Total Failed:** 14 out of 42
- **Pass Rate:** 66.67%
- **Execution Time:** 3.2s
- **Test Environments:** api-dev, api-prod

---

## Test Cases Passed

### Boundary Scenarios (@boundary) - 10 Passed
- ✅ should allow age = 150 (api-dev) - 126ms
- ✅ should reject empty name (api-dev) - 79ms
- ✅ should reject age = 151 (api-dev) - 88ms
- ✅ should reject age = 0 (api-dev) - 90ms
- ✅ should allow age = 1 (api-dev) - 107ms
- ✅ should allow age = 150 (api-prod) - 105ms
- ✅ should allow age = 1 (api-prod) - 99ms
- ✅ should reject age = 151 (api-prod) - 110ms
- ✅ should reject age = 0 (api-prod) - 109ms
- ✅ should reject empty name (api-prod) - 126ms

### Contract Scenarios (@contract) - 4 Passed
- ✅ POST /users should match user contract (api-dev) - 104ms
- ✅ POST /users should match user contract (api-prod) - 194ms
- ✅ DELETE without authentication should match error contract (api-prod) - 152ms
- ✅ GET /users should match users list contract (api-prod) - 141ms

### Positive Scenarios (@positive) - 8 Passed
- ✅ should list users successfully (api-dev) - 39ms
- ✅ should create a valid user successfully (api-dev) - 48ms
- ✅ should get an existing user by email (api-dev) - 109ms
- ✅ should update an existing user successfully (api-dev) - 153ms
- ✅ should list users successfully (api-prod) - 54ms
- ✅ should create a valid user successfully (api-prod) - 68ms
- ✅ should get an existing user by email (api-prod) - 89ms
- ✅ should update an existing user successfully (api-prod) - 119ms

### Negative Scenarios (@negative) - 4 Passed
- ✅ should return 404 when updating a non-existing user (api-dev) - 92ms
- ✅ should return 401 when deleting with invalid token (api-prod) - 92ms
- ✅ should return 404 when updating a non-existing user (api-prod) - 109ms
- ✅ should return 401 when deleting without auth token (api-prod) - 104ms

### Seed Tests - 2 Passed
- ✅ Test group › seed (api-dev) - 240ms
- ✅ Test group › seed (api-prod) - 235ms

---

## Failed Test Cases (14 total)

For details on failed test cases and bugs found, see: [BUGS.md](./BUGS.md)

---

## Detailed Test Report

For a more detailed test report including test traces and error contexts:

```bash
npm run report
```

Test results are available at: `test-results/`
HTML Report is available at: `playwright-report/`
