import type { PlaywrightTestConfig } from '@playwright/test';

// Config file docs: https://playwright.dev/docs/test-configuration
const config: PlaywrightTestConfig = {
  timeout: 60000,
  webServer: {
    command: './node_modules/.bin/next start',
    port: 3000,
    stdout: 'pipe',
  },
  testMatch: '**/playwright/**',
  // Fail tests if test.only() found on CI
  forbidOnly: !!process.env.CI,
  // Run tests in files also in parallel
  fullyParallel: true,
  // Disable all parallelization on CI
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? 'github'
    : [['html', { outputFolder: 'playwright/report/' }]],
  outputDir: 'playwright/test-results/',
  use: {
    testIdAttribute: 'data-test-id',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },
};

export default config;
