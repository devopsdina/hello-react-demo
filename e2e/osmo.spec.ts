import { expect, Page, test } from '@playwright/test';

// Keep the fallback in sync with the default flag key in src/App.tsx.
const FLAG_KEY = process.env.LAUNCHDARKLY_FLAG_KEY || 'sample-feature-dtm';

// Stub LaunchDarkly's network endpoints so the flag value is deterministic and
// no real LaunchDarkly account is needed.
async function mockLaunchDarkly(page: Page, flagValue: boolean) {
  const flags = { [FLAG_KEY]: { value: flagValue, variation: flagValue ? 0 : 1, version: 1 } };

  // Match by path so this works whichever LaunchDarkly hosts the app is configured for.
  await page.route(/launchdarkly\.com\/sdk\/evalx\//, (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(flags) }),
  );
  await page.route(/launchdarkly\.com\/eval\//, (route) =>
    route.fulfill({
      status: 200,
      contentType: 'text/event-stream',
      body: `event: put\ndata: ${JSON.stringify(flags)}\n\n`,
    }),
  );
  await page.route(/launchdarkly\.com\/(events|sdk\/goals)\//, (route) =>
    route.fulfill({ status: 202, contentType: 'application/json', body: '[]' }),
  );
}

test('shows Osmo when the flag is on', async ({ page }) => {
  await mockLaunchDarkly(page, true);
  await page.goto('/');

  await expect(page.getByText('SDK successfully initialized!')).toBeVisible({ timeout: 10000 });
  await expect(page.getByText(`The ${FLAG_KEY} feature flag evaluates to true.`)).toBeVisible();
  await expect(page.getByTestId('osmo')).toBeVisible();
});

test('hides Osmo when the flag is off', async ({ page }) => {
  await mockLaunchDarkly(page, false);
  await page.goto('/');

  await expect(page.getByText('SDK successfully initialized!')).toBeVisible({ timeout: 10000 });
  await expect(page.getByText(`The ${FLAG_KEY} feature flag evaluates to false.`)).toBeVisible();
  await expect(page.getByTestId('osmo')).toHaveCount(0);
});
