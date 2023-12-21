import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface FavoriteState {
  products: string[];
}

const initialState: FavoriteState = {
  products: [],
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<string>) => {
      state.products.push(action.payload);
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((item) => item !== action.payload);
    },
    addFavoritesFromDb: (state, action: PayloadAction<string[]>) => {
      const unic = new Set([...state.products, ...action.payload]);
      state.products = Array.from(unic);
    },
    clearFavorites: (state) => {
      state.products = [];
    },
    replaceFavorites: (state, action: PayloadAction<string[]>) => {
      state.products = [...action.payload];
    },
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  addFavoritesFromDb,
  clearFavorites,
  replaceFavorites,
} = favoriteSlice.actions;

export const selectFavoritesProducts = (state: RootState) =>
  state.favorite.products;

export default favoriteSlice.reducer;
