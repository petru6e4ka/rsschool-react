import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { User } from '../../types/form';

export const userInitialState: Partial<User> = {};

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    addName: (state, action) => ({ ...state, name: action.payload }),
    addAge: (state, action) => ({ ...state, age: action.payload }),
    addGender: (state, action) => ({ ...state, gender: action.payload }),
    addCountry: (state, action) => ({ ...state, country: action.payload }),
    addEmail: (state, action) => ({ ...state, email: action.payload }),
    addPassword: (state, action) => ({ ...state, password: action.payload }),
    addRepeatPassword: (state, action) => ({ ...state, passwordRepeat: action.payload }),
    addTerms: (state, action) => ({ ...state, terms: action.payload }),
    addAvatar: (state, action) => ({ ...state, avatar: action.payload }),
  },
});

export const userReducer = userSlice.reducer;
export const {
  addName, addAge, addGender, addCountry, addEmail, addPassword, addRepeatPassword, addTerms, addAvatar,
} = userSlice.actions;
export const useUserSelector = () => useSelector((state: { user: User | null }) => state.user);
