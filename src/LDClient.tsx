import { createLDReactProvider, LDContext, LDReactProviderOptions } from '@launchdarkly/react-sdk';

const LAUNCHDARKLY_CLIENT_SIDE_ID = import.meta.env.LAUNCHDARKLY_CLIENT_SIDE_ID ?? '';

const context: LDContext = {
  // Set up the evaluation context. This context should appear on your LaunchDarkly contexts dashboard soon after you run the demo.
  kind: 'user',
  key: 'example-user-key',
  name: 'Sandy',
};

// Set LAUNCHDARKLY_STG=true to connect to LaunchDarkly staging. Otherwise the SDK
// uses its default production endpoints.
const useStaging = import.meta.env.LAUNCHDARKLY_STG === 'true';

const stagingEndpoints = {
  baseUri: 'https://ld-stg.launchdarkly.com',
  streamUri: 'https://clientstream-stg.launchdarkly.com',
  eventsUri: 'https://events-stg.launchdarkly.com',
};

const options: LDReactProviderOptions = {
  ldOptions: {
    streaming: true,
    ...(useStaging && stagingEndpoints),
  },
};

export const LDReactProvider = createLDReactProvider(LAUNCHDARKLY_CLIENT_SIDE_ID, context, options);
