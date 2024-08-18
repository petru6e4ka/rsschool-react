import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import {
  addName, addAge, addGender, addCountry, addEmail, addPassword, addRepeatPassword, addTerms, addAvatar, resetForm,
} from '../store/form';
import { addNewUser } from '../store/history';
import { addNewError, removeError } from '../store/errors';

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
  resetForm,
  addNewUser,
  addNewError,
  removeError,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};

export default useActions;
