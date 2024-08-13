import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { Pockemon } from '../../types/Pockemon';

type PockemonTable = {
  name: string;
  height: string;
  weight: string;
  abilities: string;
  id: number;
};

export type IFavouritesInitialState = PockemonTable[];

const initialState: IFavouritesInitialState = [];

export type RequestParams = string;

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    deletePockemonFromFavourites: (state, action) => state.filter((pockemon) => pockemon.id !== action.payload),
    addPockemonToFavourites: (state, action: { payload: Pockemon }) => state.concat({
      name: action.payload.name || '',
      height: action.payload.height || '',
      weight: action.payload.weight || '',
      id: action.payload.id as number,
      abilities: action.payload.abilities?.map((ability) => ability.ability.name).join(', ') || '',
    }),
    resetFavourites: () => initialState,
  },
});

export const favouritesReducer = favouritesSlice.reducer;
export const { deletePockemonFromFavourites, resetFavourites, addPockemonToFavourites } = favouritesSlice.actions;
export const useFavouritesSelector = () => useSelector((state: { favourites: IFavouritesInitialState }) => state.favourites);
