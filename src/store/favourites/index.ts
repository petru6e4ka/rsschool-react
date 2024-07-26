import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { Pockemon } from '../../types/Pockemon';
import { TService } from '../../services/api/api';

type PockemonTable = {
  name: string;
  height: string;
  weight: string;
  abilities: string;
  id: number;
};

interface IInitialState {
  favourites: PockemonTable[];
  loadingId: number | null;
  error: string;
}

const initialState: IInitialState = {
  favourites: [],
  loadingId: null,
  error: '',
};

export type RequestParams = string;

export const addPockemonToFavourites = createAsyncThunk<Pockemon, RequestParams, { rejectValue: string }>(
  'favouritePockemon/load',
  async (id, { rejectWithValue, extra: service }) => {
    try {
      const data = await (service as TService).getPockemon(id);

      return data as unknown as Pockemon;
    } catch (err) {
      const { message } = err as unknown as { message: string };

      return rejectWithValue(message);
    }
  },
);

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    deletePockemonFromFavourites: (state, action) => {
      state.favourites = state.favourites.filter((pockemon) => pockemon.id !== action.payload);
    },
    resetFavourites: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPockemonToFavourites.fulfilled, (state, action) => {
        state.favourites.push({
          name: action.payload.name || '',
          height: action.payload.height || '',
          weight: action.payload.weight || '',
          id: action.payload.id as number,
          abilities: action.payload.abilities?.map((ability) => ability.ability.name).join(', ') || '',
        });
        state.loadingId = null;
        state.error = '';
      })
      .addCase(addPockemonToFavourites.rejected, (state, action) => {
        state.loadingId = null;
        state.error = action.payload || action.error.message || '';
      })
      .addCase(addPockemonToFavourites.pending, (state, action) => {
        state.loadingId = Number(action.meta.arg);
        state.error = '';
      });
  },
});

export const favouritesReducer = favouritesSlice.reducer;
export const { deletePockemonFromFavourites, resetFavourites } = favouritesSlice.actions;
export const useFavouritesSelector = () => useSelector((state: { favourites: IInitialState }) => state.favourites);
