import { Link, useLocation } from 'react-router-dom';
import { ChangeEvent } from 'react';
import { Pockemon } from '../../types/Pockemon';
import { useActions } from '../../hooks/useActions';
import { addPockemonToFavourites, useFavouritesSelector } from '../../store/favourites';
import { useAppDispatch } from '../../store';
import Loader from '../Loader/Loader';

import * as cls from './ListItem.module.css';

interface ListItemProps {
  item: Pockemon;
}

function ListItem({ item }: ListItemProps) {
  const { url = '' } = item;
  const parts = url.split('/').filter((el) => !!el);

  const location = useLocation();
  const pockemonId = parts[parts.length - 1] || item.id;

  const dispatch = useAppDispatch();

  const { deletePockemonFromFavourites } = useActions();
  const { favourites, loadingId } = useFavouritesSelector();

  const favouritePockemonToggle = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked && pockemonId) {
      dispatch(addPockemonToFavourites(String(pockemonId)));
      return;
    }

    if (!e.target.checked && pockemonId) {
      deletePockemonFromFavourites(Number(pockemonId));
    }
  };

  const isInFavourites = !!favourites.find((pockemon) => String(pockemon.id) === pockemonId);

  return (
    <li className={cls.List__item} key={item.name} data-testid="list-item">
      {loadingId === Number(pockemonId) && (
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
          <input
            className={cls.Input}
            type="checkbox"
            id={`favourites-${pockemonId}`}
            onChange={favouritePockemonToggle}
            checked={pockemonId ? isInFavourites : false}
          />
          <span className={cls.Hart} />
        </label>
      </div>
    </li>
  );
}

export default ListItem;
