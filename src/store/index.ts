import { configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers, Store, UnknownAction } from 'redux';
import { service } from '../services/api/api';
import { pockemonsReducer, RequestParams } from './pockemons';
import { selectedPockemonReducer } from './selectedPockemon';
import { favouritesReducer } from './favourites';

const rootReducer = combineReducers({
  pockemons: pockemonsReducer,
  selectedPockemon: selectedPockemonReducer,
  favourites: favouritesReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['favourites'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type AppThunkDispatch = ThunkDispatch<RootState, RequestParams | string, UnknownAction>;

export const store: Omit<Store, 'dispatch'> & {
  dispatch: AppThunkDispatch;
} = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
    thunk: {
      extraArgument: service,
    },
  }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const setupStore = (
  preloadedState?: Partial<RootState>,
): Omit<Store, 'dispatch'> & {
  dispatch: AppThunkDispatch;
} => configureStore({
  reducer: rootReducer,
  preloadedState,
});
