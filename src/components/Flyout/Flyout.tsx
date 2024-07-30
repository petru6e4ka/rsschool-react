import { CSVLink } from 'react-csv';
import { useActions } from '../../hooks/useActions';
import { useFavouritesSelector } from '../../store/favourites';

import * as cls from './Flyout.module.css';

const headers = [
  { label: 'Pockemon Name', key: 'name' },
  { label: 'Abilities', key: 'abilities' },
  { label: 'Height', key: 'height' },
  { label: 'Weight', key: 'weight' },
];

function Flyout() {
  const favourites = useFavouritesSelector();
  const { resetFavourites } = useActions();

  const removeFavourites = () => {
    resetFavourites();
  };

  return (
    <div className={cls.Flyout} data-testid="flyout">
      <span>{`Favourites: ${favourites.length}`}</span>
      <button type="button" onClick={removeFavourites}>
        Remove All
      </button>
      {favourites.length > 0 && (
        <CSVLink className="button" data={favourites} filename={`${favourites.length}_pockemons.csv`} headers={headers}>
          Download CSV
        </CSVLink>
      )}
    </div>
  );
}

export default Flyout;
