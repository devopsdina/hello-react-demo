import { expect, test } from '@playwright/test';

// Live test against your LaunchDarkly project: requires a real client-side ID
// and the flag turned on.
test('feature flag evaluates to true', async ({ page }) => {
  test.skip(!process.env.LAUNCHDARKLY_CLIENT_SIDE_ID, 'LAUNCHDARKLY_CLIENT_SIDE_ID is not set');

  await page.goto('/');

  await expect(page.getByText('SDK successfully initialized!')).toBeVisible({ timeout: 10000 });

  await expect(page.getByText(`feature flag evaluates to true`, { exact: false })).toBeVisible({
    timeout: 10000,
  });
  await expect(page.getByTestId('osmo')).toBeVisible();
});
