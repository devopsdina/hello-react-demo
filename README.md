# LaunchDarkly sample React application

We've built a simple React application that demonstrates how the LaunchDarkly React SDK works.

This repo is a standalone copy of the `hello-react` example from [launchdarkly/js-core](https://github.com/launchdarkly/js-core/tree/main/packages/sdk/react/examples/hello-react), trimmed down for use as a demo app.

Below, you'll find the build procedure. For more comprehensive instructions, you can visit your [Quickstart page](https://app.launchdarkly.com/quickstart#/) or the [React SDK reference guide](https://docs.launchdarkly.com/sdk/client-side/react/react-web).

This demo requires Node.js v20.19 or later.

## Build instructions

1. Copy `.env.example` to `.env` and fill in your LaunchDarkly client-side ID:

   ```bash
   cp .env.example .env
   ```

   Then edit `.env`:

   ```
   LAUNCHDARKLY_CLIENT_SIDE_ID=my-client-side-id
   ```

   Alternatively, export the variable directly:

   ```bash
   export LAUNCHDARKLY_CLIENT_SIDE_ID="my-client-side-id"
   ```

2. If there is an existing boolean feature flag in your LaunchDarkly project that you want to evaluate, set `LAUNCHDARKLY_FLAG_KEY` to the flag key (in `.env`, or exported):

   ```bash
   export LAUNCHDARKLY_FLAG_KEY="my-flag-key"
   ```

   Otherwise, `sample-feature-dtm` will be used by default.

3. Optional: if your client-side ID belongs to LaunchDarkly **staging**, add this to `.env`:

   ```
   LAUNCHDARKLY_STG=true
   ```

   When it's unset or anything other than `true`, the app connects to production LaunchDarkly.

4. Install dependencies and start the app:

   ```bash
   npm install && npm start
   ```

   You should receive the message:

   > "The sample-feature-dtm feature flag evaluates to false."

The application will run continuously and react to the flag changes in LaunchDarkly.

## When the flag is on

When the flag evaluates to `true`, the background turns green and Osmo, the LaunchDarkly mark, launches onto the page. Toggle the flag in LaunchDarkly to watch it appear and disappear live.

## End-to-end tests (optional)

The Playwright tests in `e2e/` check that the app works:

- `osmo.spec.ts` mocks LaunchDarkly and checks that Osmo appears when the flag is on and stays hidden when it's off. It needs no LaunchDarkly account.
- `verify.spec.ts` runs against your real LaunchDarkly project using `LAUNCHDARKLY_CLIENT_SIDE_ID`. It expects the flag to be on, and it's skipped if no client-side ID is set.

```bash
npm run test:install   # one-time: download the Chromium browser
npm test
```
