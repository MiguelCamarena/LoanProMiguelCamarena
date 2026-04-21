# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: users\boundary\user.boundary.api.spec.ts >> Users API - Boundary Scenarios @boundary >> should reject age = 151
- Location: src\api\tests\users\boundary\user.boundary.api.spec.ts:35:7

# Error details

```
Error: apiRequestContext.post: connect ECONNREFUSED ::1:3000
Call log:
  - → POST http://localhost:3000/prod/users
    - user-agent: Playwright/1.59.1 (x64; windows 10.0) node/22.14
    - accept: */*
    - accept-encoding: gzip,deflate,br
    - Content-Type: application/json
    - content-length: 86

```