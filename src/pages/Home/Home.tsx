import { Suspense } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import ErrorNotification from '../../components/Error/ErrorNotification';
import Search from '../../components/Search/Search';
import List from '../../components/List/List';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';
import { DEFAULT_LIMIT } from '../../services/api/api';
import ThemeSwitcher from '../../providers/theme/ThemeSwitcher/ThemeSwitcher';
import { useGetAllPockemonsQuery, useGetPockemonQuery } from '../../store/api';
import { useFavouritesSelector } from '../../store/favourites';
import Flyout from '../../components/Flyout/Flyout';

import * as styles from './Home.module.css';

function Home() {
  const favourites = useFavouritesSelector();

  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') || 1;
  const query = searchParams.get('query') || '';

  const {
    data: pockemons,
    isError: isErrorPockemons,
    isSuccess: isSuccessPockemons,
    isFetching: isFetchingPockemons,
  } = useGetAllPockemonsQuery({ skip: (Number(page) - 1) * DEFAULT_LIMIT });

  const {
    data: onePockemon,
    isError: isErrorOnePockemon,
    isSuccess: isSuccessrOnePockemon,
    isFetching: isFetchingOnePockemon,
  } = useGetPockemonQuery(query || skipToken);

  return (
    <>
      <header className={styles.Header}>
        <div className="container">
          <Search className={styles.Search} />
          <ThemeSwitcher />
        </div>
      </header>
      <main className={styles.Main} data-testid="main">
        {!query && (
          <>
            <div className="container">
              {isFetchingPockemons && <Loader />}
              {isErrorPockemons && <ErrorNotification message={"Can't load pockemons"} />}
              {!isFetchingPockemons && isSuccessPockemons && (
                <div className={styles.Pockemon}>
                  <div className={styles.PockemonMain}>
                    <List items={pockemons?.results} />
                  </div>
                  <aside className={styles.PockemonAside}>
                    <Suspense fallback={<Loader />}>
                      <Outlet />
                    </Suspense>
                  </aside>
                </div>
              )}
            </div>
            {!isFetchingPockemons && isSuccessPockemons && pockemons?.results.length > 0 && (
              <div className="container">
                <Pagination />
              </div>
            )}
          </>
        )}

        {query && (
          <div className="container">
            {isFetchingOnePockemon && <Loader />}
            {isErrorOnePockemon && <ErrorNotification message={"Can't load pockemon"} />}
            {!isFetchingOnePockemon && isSuccessrOnePockemon && (
              <div className={styles.Pockemon}>
                <div className={styles.PockemonMain}>
                  <List items={[onePockemon]} />
                </div>
                <aside className={styles.PockemonAside}>
                  <Suspense fallback={<Loader />}>
                    <Outlet />
                  </Suspense>
                </aside>
              </div>
            )}
          </div>
        )}

        {favourites.length > 0 && <Flyout />}
      </main>
    </>
  );
}

export default Home;
