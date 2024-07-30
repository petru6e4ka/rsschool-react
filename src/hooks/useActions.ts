import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { deletePockemonFromFavourites, resetFavourites, addPockemonToFavourites } from '../store/favourites';

const actions = {
  addPockemonToFavourites,
  deletePockemonFromFavourites,
  resetFavourites,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};

export default useActions;
