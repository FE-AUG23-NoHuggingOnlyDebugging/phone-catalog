import { combineReducers, configureStore } from '@reduxjs/toolkit';
import favoriteSlice from './favoriteSlice';
import cartSlice from './cartSlice';

import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

import thunk from 'redux-thunk';
import productsSlice from './productsSlice';
import recommendedSlice from './recommendedSlice';
import userSlice from './userSlice';
import paginationSlice from './paginationSlice';
import productDetailSlice from './productDetailSlice';
import productSortSlice from './productSortSlice';
import productNewSlice from './productNewSlice';
import productDiscountSlice from './productDiscountSlice';
import carouselSlice from './carouselSlice';
import categorySlice from './categorySlice';

const persistConfigFavorite = {
  //add
  key: 'favorite',
  storage,
};

const persistConfigCart = {
  //add
  key: 'cart',
  storage,
};

const rootReducer = combineReducers({
  user: userSlice,
  //cart slice
  favorite: persistReducer(persistConfigFavorite, favoriteSlice),
  cart: persistReducer(persistConfigCart, cartSlice),
  products: productsSlice,
  recommended: recommendedSlice,
  pagination: paginationSlice,
  productDetail: productDetailSlice,
  productSort: productSortSlice,
  productNew: productNewSlice,
  productDiscount: productDiscountSlice,
  carousel: carouselSlice,
  category: categorySlice,
});

export const store = configureStore({
  reducer: rootReducer,

  middleware: [thunk],
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
