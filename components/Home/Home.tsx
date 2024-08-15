import { ReactNode, useEffect, useState } from 'react';
import { Inter } from 'next/font/google';
import BugButton from '@/components/ErrorBoundary/BugButton';
import ThemeSwitcher from '@/providers/theme/ThemeSwitcher/ThemeSwitcher';
import { useTheme } from '@/providers/theme';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DEFAULT_LIMIT, useGetPockemonsByPageQuery, useGetAllPockemonsQuery } from '@/store/api';
import { useFavouritesSelector } from '@/store/favourites';
import cn from 'classnames';
import { useSearchSelector } from '@/store/search';
import { useActions } from '@/hooks/useActions';
import searchParamsUpdate from '@/utils/searchParamsUpdate/searchParamsUpdate';
import { Pockemon } from '@/types/Pockemon';
import Loader from '../Loader/Loader';
import ErrorNotification from '../ErrorNotification/ErrorNotification';
import List from '../List/List';
import Pagination from '../Pagination/Pagination';
import Flyout from '../Flyout/Flyout';
import * as styles from './Home.module.css';
import AutoComplete from '../AutoComplete/AutoComplete';
import Menu from '../Menu/Menu';

const inter = Inter({ subsets: ['latin'] });

export default function Home({ children }: { children?: ReactNode }) {
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const favourites = useFavouritesSelector();

  const router = useRouter();
  const pathname = usePathname();

  const page = searchParams.get('page') || 1;
  const query = searchParams.get('query') || '';

  const [isOpenedMenu, setIsOpenedMenu] = useState(false);
  const [filteredByQueryList, setFilteredByQueryList] = useState<Pockemon[]>([]);

  const {
    data: pockemons,
    isError: isErrorPockemons,
    isSuccess: isSuccessPockemons,
    isFetching: isFetchingPockemons,
  } = useGetPockemonsByPageQuery({ skip: (Number(page) - 1) * DEFAULT_LIMIT });

  const { data: allpockemons, isSuccess: isSuccessAllPockemons, isLoading: isLoadingAllPockemons } = useGetAllPockemonsQuery();

  const search = useSearchSelector();
  const { addSearch } = useActions();

  const changeSearch = (newValue: string) => {
    const toSearch = newValue.trim().toLowerCase();

    if (toSearch) {
      addSearch(toSearch);
      router.push(`${pathname}${searchParamsUpdate('query', toSearch, new URLSearchParams(''))}`);
      return;
    }

    addSearch('');
    router.push(`${pathname}`);
  };

  useEffect(() => {
    if (!query) {
      setFilteredByQueryList([]);
      return;
    }

    const filteredList = allpockemons?.results.filter((elem) => (elem.name as string).includes(query)) || [];
    setFilteredByQueryList(filteredList);
  }, [page, query]);

  const firstValue = (Number(page) - 1) * DEFAULT_LIMIT;
  const lastValue = firstValue + DEFAULT_LIMIT;

  const currentFilteredPage = filteredByQueryList.slice(firstValue, lastValue);

  return (
    <div className={`wrapper ${theme} ${inter.className}`} data-testid="app">
      <header className={styles.Header}>
        <div className="container">
          <div className={styles.Search}>
            {isLoadingAllPockemons && <Loader />}
            {isSuccessAllPockemons && (
              <AutoComplete
                placeholder="Search Pockemon"
                name="Search"
                value={search}
                searcher="name"
                onChange={changeSearch}
                list={allpockemons.results}
              />
            )}
          </div>

          <ThemeSwitcher className={styles.ThemeSwitcher} />
          <button
            className={cn(styles.Menu, { [styles.Open]: isOpenedMenu })}
            type="button"
            onClick={() => {
              setIsOpenedMenu((prev) => !prev);
            }}
            role="tab"
            aria-label="open menu"
          >
            <span className={styles.MenuLine} />
            <span className={styles.MenuLine} />
            <span className={styles.MenuLine} />
            <span className={styles.MenuLine} />
          </button>
        </div>
      </header>
      <main className={styles.Main} data-testid="main">
        {isOpenedMenu && <Menu />}
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
                  <aside className={styles.PockemonAside}>{children}</aside>
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
          <>
            <div className="container">
              <div className={styles.Pockemon}>
                <div className={styles.PockemonMain}>
                  <List items={currentFilteredPage} />
                </div>
                <aside className={styles.PockemonAside}>{children}</aside>
              </div>
            </div>
            {filteredByQueryList.length > 0 && (
              <div className="container">
                <Pagination total={filteredByQueryList.length} />
              </div>
            )}
          </>
        )}

        {favourites.length > 0 && <Flyout />}
      </main>
      <footer className="footer">
        <div className="container">
          <BugButton />
        </div>
      </footer>
    </div>
  );
}
