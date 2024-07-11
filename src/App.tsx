import { useCallback, useState } from 'react';
import Search from './components/Search/Search';
import ErrorNotification from './components/Error/ErrorNotification';
import Loader from './components/Loader/Loader';
import List from './components/List/List';
import BugButton from './components/ErrorBoundary/BugButton';
import { Pockemon } from './types/Pockemon';
import { getAllPockemons, getPockemon } from './services/api/api';

import './App.css';

interface State {
  isLoading: boolean;
  error: null | {
    message: string;
  };
  items: Pockemon[];
}

function App() {
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
      <header className="header">
        <div className="container">
          <Search onSearch={getSearchResults} />
        </div>
      </header>
      <main className="main">
        <div className="container">
          {pockemons.isLoading && <Loader />}
          {pockemons.error && (
            <ErrorNotification message={pockemons.error.message} />
          )}
          {pockemons.items.length > 0 && <List items={pockemons.items} />}
        </div>
      </main>
      <footer className="footer">
        <div className="container">
          <BugButton />
        </div>
      </footer>
    </>
  );
}

export default App;
