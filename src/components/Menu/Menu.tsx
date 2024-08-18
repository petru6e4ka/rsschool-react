import { CSVLink } from 'react-csv';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import ThemeSwitcher from '../../providers/theme/ThemeSwitcher/ThemeSwitcher';
import { useFavouritesSelector } from '../../store/favourites';
import { headers } from '../Flyout/headers';
import AutoComplete from '../AutoComplete/AutoComplete';
import { useSearchSelector } from '../../store/search';
import { useGetAllPockemonsQuery } from '../../store/api';
import * as styles from './Menu.module.css';
import { Pockemon } from '../../types/Pockemon';

function Menu() {
  const search = useSearchSelector();
  const [, setSearchParams] = useSearchParams();

  const favourites = useFavouritesSelector();
  const { resetFavourites, addSearch } = useActions();

  const removeFavourites = () => {
    resetFavourites();
  };

  const changeSearch = (newValue: string) => {
    addSearch(newValue);
  };

  const submitSearch = (query: string) => {
    const toSearch = query.trim().toLowerCase();

    if (toSearch) {
      setSearchParams({ query: toSearch });
      return;
    }

    setSearchParams({});
  };

  const { data: pockemons, isSuccess: isSuccessPockemons } = useGetAllPockemonsQuery();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.Menu}>
      <motion.div
        initial={{ transform: 'translateY(100vh)' }}
        animate={{ transform: 'translateY(0)' }}
        exit={{ transform: 'translateY(100vh)' }}
        className={styles.MenuContainer}
      >
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
            onSubmit={submitSearch}
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
      </motion.div>
    </motion.div>
  );
}

export default Menu;
