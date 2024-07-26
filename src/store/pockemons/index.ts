import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { Pockemon } from '../../types/Pockemon';
import { TService } from '../../services/api/api';

interface IInitialState {
  isLoading: boolean;
  error: string;
  items: Pockemon[];
}

export type RequestParams = { skip?: number; limit?: number; query?: string };

export const loadPockemons = createAsyncThunk<Pockemon[], RequestParams, { rejectValue: string }>(
  'pockemons/load',
  async (params, { rejectWithValue, extra: service }) => {
    try {
      if (params.query) {
        const data = await (service as TService).getPockemon(params.query);

        return [data] as unknown as Pockemon[];
      }

      const data = await (service as TService).getAllPockemons(params);

      return data.results as unknown as Pockemon[];
    } catch (err) {
      const { message } = err as unknown as { message: string };

      return rejectWithValue(message);
    }
  },
);

const initialState: IInitialState = {
  isLoading: false,
  error: '',
  items: [],
};

const pockemonsSlice = createSlice({
  name: 'pockemons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPockemons.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
        state.error = '';
      })
      .addCase(loadPockemons.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message || '';
        state.items = [];
      })
      .addCase(loadPockemons.pending, (state) => {
        state.isLoading = true;
        state.error = '';
        state.items = [];
      });
  },
});

export const pockemonsReducer = pockemonsSlice.reducer;
export const usePockemonsSelector = () => useSelector((state: { pockemons: IInitialState }) => state.pockemons);
