import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export type SearchInitialState = string;

const initialState: SearchInitialState = '';

const SearchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addSearch: (_, action) => action.payload,
  },
});

export const searchReducer = SearchSlice.reducer;
export const { addSearch } = SearchSlice.actions;
export const useSearchSelector = () => useSelector((state: { search: SearchInitialState }) => state.search);
