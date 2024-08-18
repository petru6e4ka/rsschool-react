import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { User } from '../../types/form';

export const historyInitialState: User[] = [];

const historySlice = createSlice({
  name: 'history',
  initialState: historyInitialState,
  reducers: {
    addNewUser: (state, action) => [...state, { ...action.payload, id: new Date().toUTCString() }],
  },
});

export const historyReducer = historySlice.reducer;
export const { addNewUser } = historySlice.actions;
export const useHistorySelector = () => useSelector((state: { history: User[] }) => state.history);
