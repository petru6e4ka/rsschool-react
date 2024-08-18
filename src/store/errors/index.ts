import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export const errorInitialState: string[] = [];

const errorSlice = createSlice({
  name: 'errors',
  initialState: errorInitialState,
  reducers: {
    addNewError: (state, action) => [...state, action.payload],
    removeError: (state, action) => state.filter((elem) => elem !== action.payload),
  },
});

export const errorReducer = errorSlice.reducer;
export const { addNewError, removeError } = errorSlice.actions;
export const useErrorSelector = () => useSelector((state: { errors: string[] }) => state.errors);
