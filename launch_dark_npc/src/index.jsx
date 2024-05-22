import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk';

(async () => {
  const LDProvider = await asyncWithLDProvider({
    clientSideID: '664e4326c06507107c5f123a',
    context: {
      kind: 'user',
      key: 'firstTry',
      name: 'Chaos'
    },
  });

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <LDProvider>
        <App />
      </LDProvider>
    </React.StrictMode>,
  );
})();