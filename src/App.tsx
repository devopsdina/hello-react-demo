import { useBoolVariationDetail, useInitializationStatus } from '@launchdarkly/react-sdk';

import './App.css';
import Osmo from './Osmo';

// Set FLAG_KEY to the feature flag key you want to evaluate.
const FLAG_KEY = import.meta.env.LAUNCHDARKLY_FLAG_KEY || 'sample-feature-dtm';

function App() {
  const { status } = useInitializationStatus();
  const { value: flagValue, reason } = useBoolVariationDetail(FLAG_KEY, false);

  if (reason?.kind === 'ERROR') {
    console.warn(`LaunchDarkly evaluation error for ${FLAG_KEY}: ${reason.errorKind}`);
  }

  let statusMessage: string;
  if (status === 'complete') {
    statusMessage = 'SDK successfully initialized!';
  } else if (status === 'timeout') {
    statusMessage = 'SDK initialization timed out. Flags will update when the connection succeeds.';
  } else if (status === 'failed') {
    statusMessage =
      'SDK failed to initialize. Please check your internet connection and SDK credential for any typo.';
  } else {
    statusMessage = 'Initializing…';
  }

  const ready = status !== 'initializing';
  // Show the flag result once the SDK has initialized or the init timeout has elapsed. After a
  // timeout the SDK keeps connecting in the background and the hook re-renders with live values.
  // If initialization fails, the SDK may still return values cached from an earlier session.
  const showResult = status === 'complete' || status === 'timeout';
  const flagOn = showResult && flagValue;
  const headerBgColor = flagOn ? '#00844B' : '#373841';

  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: headerBgColor }}>
        {ready && (
          <>
            {flagOn && <Osmo className="App-osmo" />}
            <p>{statusMessage}</p>
            {showResult && <p>{`The ${FLAG_KEY} feature flag evaluates to ${flagValue}.`}</p>}
            {showResult && reason && (
              <p className="App-reason">{`Reason: ${reason.kind}${reason.errorKind ? ` (${reason.errorKind})` : ''}`}</p>
            )}
          </>
        )}
      </header>
    </div>
  );
}

export default App;
