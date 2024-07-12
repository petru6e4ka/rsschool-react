import { ChangeEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';

import * as cls from './Search.module.css';

export const SEARCH_KEY = 'search-query';

interface Props {
  onSearch: (query: string) => void;
}

function Search({ onSearch }: Props) {
  const [query, setQuery] = useState('');
  const [, setSearchParams] = useSearchParams();

  const setInitialQuery = (val: string) => {
    setQuery(val);
    onSearch(val);

    if (val) {
      setSearchParams({ query: val });
      return;
    }

    setSearchParams({});
  };

  const [setToLocalStorage] = useLocalStorage<string>({
    key: SEARCH_KEY,
    initialValue: '',
    onSuccess: setInitialQuery,
  });

  const updateSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const getSearchResults = () => {
    const toSearch = query.trim().toLowerCase();

    setToLocalStorage(toSearch);
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
      <button type="button" onClick={getSearchResults}>
        Search
      </button>
    </div>
  );
}

export default Search;
