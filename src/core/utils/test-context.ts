import { TestInfo } from '@playwright/test';

export function getEnvironmentFromProject(testInfo: TestInfo): 'dev' | 'prod' {
  return testInfo.project.name.includes('prod') ? 'prod' : 'dev';
}