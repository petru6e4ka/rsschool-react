import { RouteObject } from 'react-router-dom';
import { Suspense } from 'react';
import Home from '../../pages/Home/HomeLazy';
import NotFound from '../../pages/404/NotFoundLazy';
import Aside from '../../components/Aside/AsideLazy';
import Loader from '../../components/Loader/Loader';

export enum AppRoutes {
  HOME = 'home',
  POCKEMON = 'pockemon',
  POCKEMON_ABOUT = 'pockemon_about',
  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: '/',
  [AppRoutes.POCKEMON]: 'pockemon',
  [AppRoutes.POCKEMON_ABOUT]: ':pockemon',
  [AppRoutes.NOT_FOUND]: '*',
};

export const routes: RouteObject[] = [
  {
    path: RoutePath.home,
    index: true,
    element: (
      <Suspense fallback={<Loader />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: RoutePath.pockemon,
    element: (
      <Suspense fallback={<Loader />}>
        <Home />
      </Suspense>
    ),
    children: [
      {
        path: RoutePath.pockemon_about,
        element: (
          <Suspense fallback={<Loader />}>
            <Aside />
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
