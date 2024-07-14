import { ChangeEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';

import * as cls from './Search.module.css';

export const SEARCH_KEY = 'search-query';

function Search() {
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const setInitialQuery = (val: string) => {
    setQuery(val);

    if (val) {
      setSearchParams({ query: val });
      return;
    }

    const allParams = Object.fromEntries(searchParams.entries());
    const { query: q, ...rest } = allParams;

    setSearchParams(rest);
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

    if (toSearch) {
      setSearchParams({ query: toSearch });
      return;
    }

    setSearchParams({});
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
