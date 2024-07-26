import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { Pockemon } from '../../types/Pockemon';
import { TService } from '../../services/api/api';

interface IInitialState {
  isLoading: boolean;
  error: string;
  pockemon: Pockemon | null;
}

export type RequestParams = string;

export const loadSelectedPockemon = createAsyncThunk<Pockemon, RequestParams, { rejectValue: string }>(
  'selectedPockemon/load',
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

const initialState: IInitialState = {
  isLoading: false,
  error: '',
  pockemon: null,
};

const selectedPockemonSlice = createSlice({
  name: 'selectedPockemon',
  initialState,
  reducers: {
    resetSelectedPockemon: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSelectedPockemon.fulfilled, (state, action) => {
        state.pockemon = action.payload;
        state.isLoading = false;
        state.error = '';
      })
      .addCase(loadSelectedPockemon.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message || '';
        state.pockemon = null;
      })
      .addCase(loadSelectedPockemon.pending, (state) => {
        state.isLoading = true;
        state.error = '';
        state.pockemon = null;
      });
  },
});

export const selectedPockemonReducer = selectedPockemonSlice.reducer;
export const { resetSelectedPockemon } = selectedPockemonSlice.actions;
export const useSelectedPockemonSelector = () => useSelector((state: { selectedPockemon: IInitialState }) => state.selectedPockemon);
