# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: users\negative\user.negative.api.spec.ts >> Users API - Negative Scenarios @negative >> should return 400 when creating user with invalid email
- Location: src\api\tests\users\negative\user.negative.api.spec.ts:10:7

# Error details

```
Error: apiRequestContext.post: connect ECONNREFUSED ::1:3000
Call log:
  - → POST http://localhost:3000/dev/users
    - user-agent: Playwright/1.59.1 (x64; windows 10.0) node/22.14
    - accept: */*
    - accept-encoding: gzip,deflate,br
    - Content-Type: application/json
    - content-length: 56

```