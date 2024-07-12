import { Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { routeConfig } from '../../configs/router/router';
import Loader from '../../components/Loader/Loader';

function Router() {
  return (
    <Routes>
      {Object.values(routeConfig).map(({ element, path }) => (
        <Route
          key={path}
          element={<Suspense fallback={<Loader />}>{element}</Suspense>}
          path={path}
        />
      ))}
    </Routes>
  );
}

export default Router;
