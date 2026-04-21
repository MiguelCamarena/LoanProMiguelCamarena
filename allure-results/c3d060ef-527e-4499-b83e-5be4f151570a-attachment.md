# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: users\positive\user.positive.api.spec.ts >> Users API - Positive Scenarios @positive >> should list users successfully
- Location: src\api\tests\users\positive\user.positive.api.spec.ts:11:7

# Error details

```
ZodError: [
  {
    "validation": "email",
    "code": "invalid_string",
    "message": "Invalid email",
    "path": [
      3,
      "email"
    ]
  }
]
```

# Test source

```ts
  1 | import { ZodSchema } from 'zod';
  2 | 
  3 | export function validateSchema<T>(schema: ZodSchema<T>, payload: unknown): T {
> 4 |   return schema.parse(payload);
    |                 ^ ZodError: [
  5 | }
  6 | 
```