import { combineReducers, configureStore } from '@reduxjs/toolkit';
import favoriteSlice from './favoriteSlice';

import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

import thunk from 'redux-thunk';

const persistConfigFavorite = {
  //add
  key: 'favorite',
  storage,
};

const rootReducer = combineReducers({
  //user slice
  //cart slice
  favorite: persistReducer(persistConfigFavorite, favoriteSlice),
  //any slice
});

export const store = configureStore({
  reducer: rootReducer,

  middleware: [thunk],
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
