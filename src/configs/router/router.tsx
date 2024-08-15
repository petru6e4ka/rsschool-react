import { RouteObject } from 'react-router-dom';
import { Suspense } from 'react';
import NotFound from '../../pages/404/NotFoundLazy';
import Loader from '../../components/Loader/Loader';
import { ReactHookForm } from '../../components/ReactHookForm/ReactHookForm';
import { UncontrolledForm } from '../../components/UncontrolledForm/UncontrolledForm';
import { Main } from '../../components/Main/Main';

export enum AppRoutes {
  MAIN = 'main',
  UNCONTROLLED = 'uncontrolled',
  REACT_HOOK = 'react_hook',
  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.UNCONTROLLED]: 'uncontrolled',
  [AppRoutes.REACT_HOOK]: 'react_hook',
  [AppRoutes.NOT_FOUND]: '*',
};

export const routes: RouteObject[] = [
  {
    path: RoutePath.main,
    index: true,
    element: (
      <Suspense fallback={<Loader />}>
        <Main />
      </Suspense>
    ),
  },
  {
    path: RoutePath.uncontrolled,
    element: (
      <Suspense fallback={<Loader />}>
        <UncontrolledForm />
      </Suspense>
    ),
  },
  {
    path: RoutePath.react_hook,
    element: (
      <Suspense fallback={<Loader />}>
        <ReactHookForm />
      </Suspense>
    ),
  },
  {
    path: RoutePath.not_found,
    element: <NotFound />,
  },
];
