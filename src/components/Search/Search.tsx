import { ChangeEvent, useEffect, useState } from 'react';
import { queryStorage } from '../../utils/localStorage/localStorage';

import * as cls from './Search.module.css';

interface Props {
  onSearch: (query: string) => void;
}

function Search({ onSearch }: Props) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const getInitialQuery = () => {
      const search = queryStorage.get();

      if (search) {
        setQuery(search);
        onSearch(search);

        return;
      }

      onSearch(query);
    };

    getInitialQuery();
  }, []);

  const updateSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const getSearchResults = () => {
    const toSearch = query.trim().toLowerCase();

    queryStorage.set(toSearch);
    onSearch(toSearch);
  };

  return (
    <div className={cls.Search}>
      <input
        className={cls.Search__input}
        type="text"
        name="search"
        id="search"
        value={query}
        onChange={updateSearch}
      />
      <button
        className={cls.Search__button}
        type="button"
        onClick={getSearchResults}
      >
        Search
      </button>
    </div>
  );
}

export default Search;
