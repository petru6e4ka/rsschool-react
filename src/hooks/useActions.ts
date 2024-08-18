import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import {
  addName, addAge, addGender, addCountry, addEmail, addPassword, addRepeatPassword, addTerms, addAvatar,
} from '../store/form';

const actions = {
  addName,
  addAge,
  addGender,
  addCountry,
  addEmail,
  addPassword,
  addRepeatPassword,
  addTerms,
  addAvatar,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};

export default useActions;
