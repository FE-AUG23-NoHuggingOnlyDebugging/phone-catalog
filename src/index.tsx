import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter as Router} from 'react-router-dom';
import App from './App';

import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </Router>,
);
