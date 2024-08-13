import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { pokemonApi } from './api';
import { favouritesReducer } from './favourites';
import { searchReducer } from './search';

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    favourites: favouritesReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([pokemonApi.middleware]),
});

setupListeners(store.dispatch);

export default store;
