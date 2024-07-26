import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { resetSelectedPockemon } from '../store/selectedPockemon';
import { addPockemonToFavourites, deletePockemonFromFavourites, resetFavourites } from '../store/favourites';

const actions = {
  resetSelectedPockemon,
  addPockemonToFavourites,
  deletePockemonFromFavourites,
  resetFavourites,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};

export default useActions;
