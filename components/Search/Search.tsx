import { ChangeEvent, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import searchParamsUpdate from '@/utils/searchParamsUpdate/searchParamsUpdate';
import useLocalStorage from '../../hooks/useLocalStorage';
import * as styles from './Search.module.css';

export const SEARCH_KEY = 'search-query';

function Search({ className = '' }: { className?: string }) {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setInitialQuery = (val: string) => {
    setQuery(val);
    router.push(`${pathname}${searchParamsUpdate('query', val, searchParams)}`);
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
    router.push(`${pathname}${searchParamsUpdate('query', toSearch, searchParams)}`);
  };

  return (
    <div className={`${styles.Search} ${className}`} data-testid="search">
      <input className={styles.SearchInput} type="text" name="search" id="search" value={query} onChange={updateSearch} data-testid="search-input" />
      <button type="button" onClick={getSearchResults} data-testid="search-btn">
        Search
      </button>
    </div>
  );
}

export default Search;
