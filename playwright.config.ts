import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './src/api/tests',
  timeout: 30_000,
  workers: process.env.CI ? 2 : 4,
  expect: {
    timeout: 5_000,
  },
  fullyParallel: true,
  reporter: [
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['list'],
    ['allure-playwright']
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'api-dev',
      use: {
        baseURL: process.env.BASE_URL || 'http://localhost:3000',
      },
      metadata: {
        environment: 'dev',
      },
    },
    {
      name: 'api-prod',
      use: {
        baseURL: process.env.BASE_URL || 'http://localhost:3000',
      },
      metadata: {
        environment: 'prod',
      },
    },
  ],
});