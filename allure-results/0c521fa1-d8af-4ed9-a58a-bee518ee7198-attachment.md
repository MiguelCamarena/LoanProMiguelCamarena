# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: users\positive\user.positive.api.spec.ts >> Users API - Positive Scenarios @positive >> should list users successfully
- Location: src\api\tests\users\positive\user.positive.api.spec.ts:10:7

# Error details

```
Error: apiRequestContext.get: connect ECONNREFUSED ::1:3000
Call log:
  - → GET http://localhost:3000/dev/users
    - user-agent: Playwright/1.59.1 (x64; windows 10.0) node/22.14
    - accept: */*
    - accept-encoding: gzip,deflate,br
    - Content-Type: application/json

```