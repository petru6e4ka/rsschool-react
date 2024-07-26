import { useCallback, useEffect, Suspense } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import ErrorNotification from '../../components/Error/ErrorNotification';
import Search from '../../components/Search/Search';
import List from '../../components/List/List';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';
import { DEFAULT_LIMIT } from '../../services/api/api';
import ThemeSwitcher from '../../providers/theme/ThemeSwitcher/ThemeSwitcher';
import { loadPockemons, usePockemonsSelector } from '../../store/pockemons';
import { useAppDispatch } from '../../store';
import { useFavouritesSelector } from '../../store/favourites';
import Flyout from '../../components/Flyout/Flyout';

import * as cls from './Home.module.css';

function Home() {
  const dispatch = useAppDispatch();
  const { error, isLoading, items } = usePockemonsSelector();
  const { favourites, error: errorAddToFavourites } = useFavouritesSelector();

  const [searchParams] = useSearchParams();

  const getSearchResults = useCallback((query: string) => {
    if (!query) {
      dispatch(loadPockemons({}));
      return;
    }

    dispatch(loadPockemons({ query }));
  }, []);

  const changePage = (newPage: number) => {
    dispatch(loadPockemons({ skip: (newPage - 1) * DEFAULT_LIMIT }));
  };

  const page = searchParams.get('page');
  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (!query && !page) {
      changePage(1);
      return;
    }

    if (!query && page) {
      changePage(Number(page));
      return;
    }

    getSearchResults(query);
  }, [query, page]);

  const isListShowing = !isLoading && !error && items.length > 0;
  const isPaginateShowing = !isLoading && !error && items.length > 1;
  const hasError = errorAddToFavourites || error;

  return (
    <>
      <header className={cls.Header}>
        <div className="container">
          <Search className={cls.Search} />
          <ThemeSwitcher />
        </div>
      </header>
      <main className={cls.Main} data-testid="main">
        <div className="container">
          {isLoading && <Loader />}
          {hasError && <ErrorNotification message={hasError} />}
          {isListShowing && (
            <div className={cls.Pockemon}>
              <div className={cls.Pockemon__main}>
                <List items={items} />
              </div>
              <aside className={cls.Pockemon__aside}>
                <Suspense fallback={<Loader />}>
                  <Outlet />
                </Suspense>
              </aside>
            </div>
          )}
        </div>
        <div className="container">{isPaginateShowing && <Pagination />}</div>
        {favourites.length > 0 && <Flyout />}
      </main>
    </>
  );
}

export default Home;
