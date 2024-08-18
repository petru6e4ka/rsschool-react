import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import PageError from './components/PageError/PageError';
import { ThemeProvider } from './providers/theme';
import { store, persistor } from './store';
import Loader from './components/Loader/Loader';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <BrowserRouter>
          <ErrorBoundary fallback={<PageError />}>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </ErrorBoundary>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
