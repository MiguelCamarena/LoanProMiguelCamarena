# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: users\negative\user.negative.api.spec.ts >> Users API - Negative Scenarios @negative >> should return 404 when updating a non-existing user
- Location: src\api\tests\users\negative\user.negative.api.spec.ts:48:7

# Error details

```
Error: apiRequestContext.put: connect ECONNREFUSED ::1:3000
Call log:
  - → PUT http://localhost:3000/prod/users/user.1776808825581860%40example.com
    - user-agent: Playwright/1.59.1 (x64; windows 10.0) node/22.14
    - accept: */*
    - accept-encoding: gzip,deflate,br
    - Content-Type: application/json
    - content-length: 85

```