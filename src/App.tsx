import { Suspense } from 'react';
import AppRouter from './providers/router/Router';
import Loader from './components/Loader/Loader';
import BugButton from './components/ErrorBoundary/BugButton';

function App() {
  return (
    <div className="min-h-screen flex flex-col justify-between " data-testid="app">
      <Suspense fallback={<Loader />}>
        <AppRouter />
      </Suspense>
      <footer className="flex items-center h-[70px] shadow-inner">
        <div className="w-full max-w-[1280px] my-0 mx-auto px-[15px] flex justify-center">
          <BugButton />
        </div>
      </footer>
    </div>
  );
}

export default App;
