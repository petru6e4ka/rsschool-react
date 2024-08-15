import { CSVLink } from 'react-csv';
import { headers } from '@/components/Flyout/Flyout';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import searchParamsUpdate from '@/utils/searchParamsUpdate/searchParamsUpdate';
import { useActions } from '../../hooks/useActions';
import ThemeSwitcher from '../../providers/theme/ThemeSwitcher/ThemeSwitcher';
import { useFavouritesSelector } from '../../store/favourites';
import AutoComplete from '../AutoComplete/AutoComplete';
import { useSearchSelector } from '../../store/search';
import { useGetAllPockemonsQuery } from '../../store/api';
import * as styles from './Menu.module.css';
import { Pockemon } from '../../types/Pockemon';

function Menu() {
  const search = useSearchSelector();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const favourites = useFavouritesSelector();
  const { resetFavourites, addSearch } = useActions();

  const removeFavourites = () => {
    resetFavourites();
  };

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

  const { data: pockemons, isSuccess: isSuccessPockemons } = useGetAllPockemonsQuery();

  return (
    <div className={styles.Menu}>
      <div className={styles.MenuContainer}>
        <div className={styles.MenuBlock}>
          <div className={styles.Settings}>
            Settings:
            <ThemeSwitcher />
          </div>
        </div>

        <div className={styles.MenuBlock}>
          <AutoComplete
            placeholder="Search Pockemon"
            name="Search"
            value={search}
            searcher="name"
            onChange={changeSearch}
            list={isSuccessPockemons ? pockemons.results : ([] as Pockemon[])}
          />
        </div>

        <div className={styles.MenuBlock}>
          <p className={styles.Settings}>
            Favourites:
            <span className={styles.Accent}>{favourites.length}</span>
          </p>

          {favourites.length > 0 && (
            <div className={styles.FavouritesActions}>
              <button type="button" onClick={removeFavourites}>
                Remove All
              </button>
              {favourites.length > 0 && (
                <CSVLink className="button" data={favourites} filename={`${favourites.length}_pockemons.csv`} headers={headers}>
                  Download CSV
                </CSVLink>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Menu;
