import Link from 'next/link';
import { ChangeEvent } from 'react';
import { useActions } from '@/hooks/useActions';
import { useSearchParams } from 'next/navigation';
import { Pockemon } from '../../types/Pockemon';
import { useFavouritesSelector } from '../../store/favourites';
import { pokemonApi } from '../../store/api';
import Loader from '../Loader/Loader';

import * as styles from './ListItem.module.css';

type Props = {
  item: Pockemon;
};

function ListItem({ item }: Props) {
  const { url = '' } = item;
  const parts = url.split('/').filter((el) => !!el);
  const pockemonId = parts[parts.length - 1] || item.id;

  const searchParams = useSearchParams();
  const currentSearch = new URLSearchParams(Array.from(searchParams.entries())).toString();

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
    <li className={styles.ListItem} key={item.name} data-testid="list-item">
      {isFetching && (
        <div className={styles.Backdrop}>
          <Loader />
        </div>
      )}
      <p className={styles.ListItemTitle}>{item.name}</p>
      <div className={styles.ListItemActions}>
        <Link href={`/pockemons/${pockemonId}?${currentSearch}`} data-testid="open-detailed_card">
          Learn more
        </Link>

        <label className={styles.InputWrapper} htmlFor={`favourites-${pockemonId}`}>
          Like
          <input
            className={styles.Input}
            type="checkbox"
            id={`favourites-${pockemonId}`}
            onChange={favouritePockemonToggle}
            checked={isInFavourites}
          />
          <span className={styles.Hart} />
        </label>
      </div>
    </li>
  );
}

export default ListItem;
