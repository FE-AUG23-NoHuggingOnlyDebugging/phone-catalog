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
  },
});

export const { addToFavorites, removeFromFavorites } = favoriteSlice.actions;

export const selectFavoritesProducts = (state: RootState) =>
  state.favorite.products;

export default favoriteSlice.reducer;
