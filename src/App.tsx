import { Suspense } from 'react';
import AppRouter from './providers/router/Router';
import Loader from './components/Loader/Loader';
import BugButton from './components/ErrorBoundary/BugButton';

import './App.css';

function App() {
  return (
    <div className="wrapper">
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
