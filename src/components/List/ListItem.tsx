import { Link, useLocation } from 'react-router-dom';
import { ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { Pockemon } from '../../types/Pockemon';
import { useActions } from '../../hooks/useActions';
import { useFavouritesSelector } from '../../store/favourites';
import { pokemonApi } from '../../store/api';
import Loader from '../Loader/Loader';

import * as styles from './ListItem.module.css';

type Props = {
  item: Pockemon;
};

const hart = {
  rest: { scale: 1 },
  pressed: { scale: 0.95 },
  hover: {
    scale: 1.3,
    transition: {
      duration: 0.3,
      yoyo: Infinity,
    },
  },
};

function ListItem({ item }: Props) {
  const { url = '' } = item;
  const parts = url.split('/').filter((el) => !!el);

  const location = useLocation();
  const pockemonId = parts[parts.length - 1] || item.id;

  const { deletePockemonFromFavourites, addPockemonToFavourites } = useActions();
  const [trigger, { isFetching }] = pokemonApi.endpoints.getPockemon.useLazyQuery();
  const favourites = useFavouritesSelector();

  const favouritePockemonToggle = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked && pockemonId) {
      await trigger(String(pockemonId))
        .unwrap()
        .then((pockemon) => {
          addPockemonToFavourites(pockemon);
        });

      return;
    }

    if (!e.target.checked && pockemonId) {
      deletePockemonFromFavourites(Number(pockemonId));
    }
  };

  const isInFavourites = !!favourites.find((pockemon) => String(pockemon.id) === String(pockemonId));

  return (
    <motion.li
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className={styles.ListItem}
      key={item.name}
      data-testid="list-item"
    >
      {isFetching && (
        <div className={styles.Backdrop}>
          <Loader />
        </div>
      )}
      <p className={styles.ListItemTitle}>{item.name}</p>
      <div className={styles.ListItemActions}>
        <motion.div whileHover={{ scale: 1.2 }} transition={{ type: 'spring', stiffness: 200 }}>
          <Link to={`/pockemon/${pockemonId}${location.search}`} data-testid="open-detailed_card">
            Learn more
          </Link>
        </motion.div>

        <label className={styles.InputWrapper} htmlFor={`favourites-${pockemonId}`}>
          Like
          <input
            className={styles.Input}
            type="checkbox"
            id={`favourites-${pockemonId}`}
            onChange={favouritePockemonToggle}
            checked={isInFavourites}
          />
          <motion.span variants={hart} initial="rest" whileHover="hover" whileTap="pressed" className={styles.Hart} />
        </label>
      </div>
    </motion.li>
  );
}

export default ListItem;
