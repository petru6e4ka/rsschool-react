import { Link, useLocation } from 'react-router-dom';
import { ChangeEvent } from 'react';
import { Pockemon } from '../../types/Pockemon';
import { useActions } from '../../hooks/useActions';
import { useFavouritesSelector } from '../../store/favourites';
import { pokemonApi } from '../../store/api';
import Loader from '../Loader/Loader';

import * as cls from './ListItem.module.css';

type Props = {
  item: Pockemon;
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
    <li className={cls.List__item} key={item.name} data-testid="list-item">
      {isFetching && (
        <div className={cls.Backdrop}>
          <Loader />
        </div>
      )}
      <p className={cls.ListItem__title}>{item.name}</p>
      <div className={cls.ListItem__actions}>
        <Link to={`/pockemon/${pockemonId}${location.search}`} data-testid="open-detailed_card">
          Learn more
        </Link>

        <label className={cls.Input__wrapper} htmlFor={`favourites-${pockemonId}`}>
          Like
          <input className={cls.Input} type="checkbox" id={`favourites-${pockemonId}`} onChange={favouritePockemonToggle} checked={isInFavourites} />
          <span className={cls.Hart} />
        </label>
      </div>
    </li>
  );
}

export default ListItem;
