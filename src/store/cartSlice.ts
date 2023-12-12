import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface CartState {
  products: string[];
}

const initialState: CartState = {
  products: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<string>) => {
      state.products.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((item) => item !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export const selectCartProducts = (state: RootState) => state.cart.products;

export default cartSlice.reducer;
