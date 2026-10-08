import { defineConfig } from '@playwright/test';

// Pick up LAUNCHDARKLY_* values from .env (if present) so the live test can use them.
try {
  process.loadEnvFile();
} catch {
  // No .env file; rely on the shell environment.
}

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:4173',
  },
  webServer: {
    command: 'npm run build && npm run preview',
    port: 4173,
    timeout: 60_000,
    reuseExistingServer: !process.env.CI,
    env: {
      // The mocked tests don't contact LaunchDarkly, so any ID works when none is set.
      LAUNCHDARKLY_CLIENT_SIDE_ID: process.env.LAUNCHDARKLY_CLIENT_SIDE_ID || 'mock-client-side-id',
    },
  },
});
