import { RouteObject } from 'react-router-dom';
import { Suspense } from 'react';
import NotFound from '../../pages/404/NotFound';
import Loader from '../../components/Loader/Loader';
import { ReactHookFormLazy as ReactHookForm } from '../../pages/ReactHookForm/ReactHookFormLazy';
import { UncontrolledFormLazy as UncontrolledForm } from '../../pages/UncontrolledForm/UncontrolledFormLazy';
import { MainLazy as Main } from '../../pages/Main/MainLazy';

export enum AppRoutes {
  MAIN = 'main',
  UNCONTROLLED = 'uncontrolled_form',
  REACT_HOOK = 'react_hook_form',
  FORM_PARAMS = 'formParams',
  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.UNCONTROLLED]: 'uncontrolled_form',
  [AppRoutes.REACT_HOOK]: 'react_hook_form',
  [AppRoutes.FORM_PARAMS]: ':formParams',
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
    path: RoutePath.uncontrolled_form,
    element: (
      <Suspense fallback={<Loader />}>
        <UncontrolledForm />
      </Suspense>
    ),
    children: [
      {
        path: RoutePath.formParams,
        element: (
          <Suspense fallback={<Loader />}>
            <UncontrolledForm />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: RoutePath.react_hook_form,
    element: (
      <Suspense fallback={<Loader />}>
        <ReactHookForm />
      </Suspense>
    ),
    children: [
      {
        path: RoutePath.formParams,
        element: (
          <Suspense fallback={<Loader />}>
            <ReactHookForm />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: RoutePath.not_found,
    element: <NotFound />,
  },
];
