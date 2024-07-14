import {
  useState, useCallback, useEffect, Suspense,
} from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import ErrorNotification from '../../components/Error/ErrorNotification';
import Search from '../../components/Search/Search';
import List from '../../components/List/List';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';
import {
  getPockemon,
  getAllPockemons,
  DEFAULT_LIMIT,
} from '../../services/api/api';
import { Pockemon } from '../../types/Pockemon';

import * as cls from './Home.module.css';

interface State {
  isLoading: boolean;
  error: null | {
    message: string;
  };
  items: Pockemon[];
}

function Home() {
  const [pockemons, setPockemons] = useState<State>({
    isLoading: false,
    error: null,
    items: [],
  });
  const [searchParams] = useSearchParams();

  const getSearchResults = useCallback((query: string) => {
    setPockemons({
      isLoading: true,
      error: null,
      items: [],
    });

    if (query) {
      getPockemon(query)
        .then((response) => {
          setPockemons({
            isLoading: false,
            error: null,
            items: [response],
          });
        })
        .catch((error) => {
          setPockemons({
            isLoading: false,
            error: {
              message: error.message,
            },
            items: [],
          });
        });

      return;
    }

    getAllPockemons()
      .then((response) => {
        setPockemons({
          isLoading: false,
          error: null,
          items: response.results,
        });
      })
      .catch((error) => {
        setPockemons({
          isLoading: false,
          error: {
            message: error.message,
          },
          items: [],
        });
      });
  }, []);

  const changePage = (newPage: number) => {
    setPockemons({
      isLoading: true,
      error: null,
      items: [],
    });

    getAllPockemons({ skip: (newPage - 1) * DEFAULT_LIMIT })
      .then((response) => {
        setPockemons({
          isLoading: false,
          error: null,
          items: response.results,
        });
      })
      .catch((error) => {
        setPockemons({
          isLoading: false,
          error: {
            message: error.message,
          },
          items: [],
        });
      });
  };

  const page = searchParams.get('page');
  const query = searchParams.get('query') || '';

  useEffect(() => {
    changePage(Number(page));
  }, [page]);

  useEffect(() => {
    getSearchResults(query);
  }, [query]);

  const isListShowing = !pockemons.isLoading && !pockemons.error && pockemons.items.length > 0;
  const isPaginateShowing = !pockemons.isLoading && !pockemons.error && pockemons.items.length > 1;

  return (
    <>
      <header className={cls.Header}>
        <div className="container">
          <Search />
        </div>
      </header>
      <main className={cls.Main}>
        <div className="container">
          {pockemons.isLoading && <Loader />}
          {pockemons.error && (
            <ErrorNotification message={pockemons.error.message} />
          )}
          {isListShowing && (
            <div className={cls.Pockemon}>
              <div className={cls.Pockemon__main}>
                <List items={pockemons.items} />
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
      </main>
    </>
  );
}

export default Home;
