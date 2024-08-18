import {
  combineReducers, configureStore, EnhancedStore, StoreEnhancer, ThunkDispatch, Tuple, UnknownAction,
} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE,
} from 'redux-persist';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { favouritesReducer, FavouritesInitialState } from './favourites';
import { pokemonApi } from './api';
import { searchReducer } from './search';

const rootReducer = combineReducers({
  favourites: favouritesReducer,
  search: searchReducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['favourites', 'search'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store: EnhancedStore<
{
  favourites: FavouritesInitialState;
},
UnknownAction,
Tuple<
[
  StoreEnhancer<{
    dispatch: ThunkDispatch<
    {
      favourites: FavouritesInitialState;
    },
    undefined,
    UnknownAction
    >;
  }>,
  StoreEnhancer,
]
>
> = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(pokemonApi.middleware),
});

export const persistor = persistStore(store);

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch'];

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const setupStore = (preloadedState?: Partial<RootState>) => configureStore({
  reducer: rootReducer,
  preloadedState,
});
