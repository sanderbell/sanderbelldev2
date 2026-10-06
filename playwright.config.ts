import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  use: {
    baseURL: 'http://127.0.0.1:4175',
    trace: 'retain-on-failure',
    launchOptions: process.env.HUI_CHROME_PATH ? { executablePath: process.env.HUI_CHROME_PATH } : {},
  },
  webServer: {
    command: 'node scripts/serve-hui-test.mjs',
    url: 'http://127.0.0.1:4175/hui/',
    reuseExistingServer: !process.env.CI,
  },
});
