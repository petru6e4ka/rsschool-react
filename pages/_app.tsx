import type { AppProps } from 'next/app';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import PageError from '@/components/PageError/PageError';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { ThemeProvider } from '@/providers/theme';
import '@/styles/globals.css';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import Home from '@/components/Home/Home';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ErrorBoundary fallback={<PageError />}>
      <Provider store={store}>
        <ThemeProvider>
          <Home>{getLayout(<Component {...pageProps} />)}</Home>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}
