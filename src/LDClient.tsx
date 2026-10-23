import { createLDReactProvider, LDContext, LDReactProviderOptions } from '@launchdarkly/react-sdk';

// Never commit a client-side ID. Set it in .env (git-ignored) or export it before running.
const LAUNCHDARKLY_CLIENT_SIDE_ID = import.meta.env.LAUNCHDARKLY_CLIENT_SIDE_ID ?? '';

if (!LAUNCHDARKLY_CLIENT_SIDE_ID) {
  console.error('LAUNCHDARKLY_CLIENT_SIDE_ID is not set. Flags will use their fallback values.');
}

const context: LDContext = {
  // Set up the evaluation context. This context should appear on your LaunchDarkly contexts dashboard soon after you run the demo.
  kind: 'user',
  key: 'example-user-key',
  name: 'Sandy',
};

// Bootstrapping: the SDK caches flag values in localStorage automatically and reuses them on
// the next page load. This demo still only shows a flag result once the SDK has reached
// LaunchDarkly or the init timeout has elapsed (see App.tsx).
const options: LDReactProviderOptions = {
  ldOptions: {
    streaming: true,
    // Include evaluation reasons so useBoolVariationDetail can report why a flag has its value.
    withReasons: true,
    // Attributes usage (cMAU) to this app in LaunchDarkly's Plan usage reporting.
    applicationInfo: { id: 'hello-react-demo', version: '0.1.0' },
  },
  // In seconds. Don't block the UI on LaunchDarkly: client-side SDKs should wait 100–500 ms.
  startOptions: { timeout: 0.5 },
};

export const LDReactProvider = createLDReactProvider(LAUNCHDARKLY_CLIENT_SIDE_ID, context, options);
