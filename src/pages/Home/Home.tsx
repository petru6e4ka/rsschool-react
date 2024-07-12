import { useState, useCallback } from 'react';
import ErrorNotification from '../../components/Error/ErrorNotification';
import Search from '../../components/Search/Search';
import List from '../../components/List/List';
import Loader from '../../components/Loader/Loader';
import { getPockemon, getAllPockemons } from '../../services/api/api';
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

  return (
    <>
      <header className={cls.Header}>
        <div className="container">
          <Search onSearch={getSearchResults} />
        </div>
      </header>
      <main className={cls.Main}>
        <div className="container">
          {pockemons.isLoading && <Loader />}
          {pockemons.error && (
            <ErrorNotification message={pockemons.error.message} />
          )}
          {pockemons.items.length > 0 && <List items={pockemons.items} />}
        </div>
      </main>
    </>
  );
}

export default Home;
