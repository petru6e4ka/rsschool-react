import { CSVLink } from 'react-csv';
import { AnimatePresence, motion } from 'framer-motion';
import { useActions } from '../../hooks/useActions';
import { useFavouritesSelector } from '../../store/favourites';

import * as styles from './Flyout.module.css';
import { headers } from './headers';

function Flyout() {
  const favourites = useFavouritesSelector();
  const { resetFavourites } = useActions();

  const removeFavourites = () => {
    resetFavourites();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, right: '-100px' }}
        animate={{ opacity: 1, right: '0px' }}
        exit={{ opacity: 0, right: '-100px' }}
        className={styles.Flyout}
        data-testid="flyout"
      >
        <span>{`Favourites: ${favourites.length}`}</span>
        <button type="button" onClick={removeFavourites}>
          Remove All
        </button>
        {favourites.length > 0 && (
          <CSVLink className="button" data={favourites} filename={`${favourites.length}_pockemons.csv`} headers={headers}>
            Download CSV
          </CSVLink>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default Flyout;
