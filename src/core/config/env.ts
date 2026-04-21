export const envConfig = {
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  targetEnv: process.env.TARGET_ENV || 'dev',
  authToken: process.env.AUTH_TOKEN || 'mysecrettoken',
} as const;
