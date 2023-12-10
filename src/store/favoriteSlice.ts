import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Phone } from '../types/Phone';

export interface FavoriteState {
  goods: Phone[];
  count: number;
}

const initialState: FavoriteState = {
  goods: [],
  count: 0,
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Phone>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.goods.push(action.payload);
      state.count += 1;
    },
    removeFromFavorites: (state, action: PayloadAction<Phone>) => {
      state.goods = state.goods.filter((item) => item.id !== action.payload.id);
      state.count -= 1;
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoriteSlice.actions;

export const selectFavoritesGoods = (state: RootState) => state.favorite.goods;
export const selectFavoritesCount = (state: RootState) => state.favorite.count;

export default favoriteSlice.reducer;
