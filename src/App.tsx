import { Suspense } from 'react';
import AppRouter from './providers/router/Router';
import Loader from './components/Loader/Loader';
import BugButton from './components/ErrorBoundary/BugButton';
import { useTheme } from './providers/theme';

import './App.css';

function App() {
  const { theme } = useTheme();

  return (
    <div className={`wrapper ${theme}`} data-testid="app">
      <Suspense fallback={<Loader />}>
        <AppRouter />
      </Suspense>
      <footer className="footer">
        <div className="container">
          <BugButton />
        </div>
      </footer>
    </div>
  );
}

export default App;
