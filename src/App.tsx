import { useBoolVariation, useInitializationStatus } from '@launchdarkly/react-sdk';

import './App.css';
import Osmo from './Osmo';

// Set FLAG_KEY to the feature flag key you want to evaluate.
const FLAG_KEY = import.meta.env.LAUNCHDARKLY_FLAG_KEY || 'sample-feature-dtm';

function App() {
  const { status } = useInitializationStatus();
  const flagValue = useBoolVariation(FLAG_KEY, false);

  let statusMessage: string;
  if (status === 'complete') {
    statusMessage = 'SDK successfully initialized!';
  } else if (status === 'failed') {
    statusMessage =
      'SDK failed to initialize. Please check your internet connection and SDK credential for any typo.';
  } else {
    statusMessage = 'Initializing\u2026';
  }

  const ready = status !== 'initializing';
  // Only show the flag result once the SDK has initialized. If initialization
  // fails, the SDK may still return values cached from an earlier session.
  const initialized = status === 'complete';
  const flagOn = initialized && flagValue;
  const headerBgColor = flagOn ? '#00844B' : '#373841';

  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: headerBgColor }}>
        {ready && (
          <>
            {flagOn && <Osmo className="App-osmo" />}
            <p>{statusMessage}</p>
            {initialized && <p>{`The ${FLAG_KEY} feature flag evaluates to ${flagValue}.`}</p>}
          </>
        )}
      </header>
    </div>
  );
}

export default App;
