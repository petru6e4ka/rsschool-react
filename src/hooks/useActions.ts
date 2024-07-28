import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { resetSelectedPockemon } from '../store/selectedPockemon';
import { deletePockemonFromFavourites, resetFavourites } from '../store/favourites';

const actions = {
  resetSelectedPockemon,
  deletePockemonFromFavourites,
  resetFavourites,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};

export default useActions;
