import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface CartProduct {
  name: string;
  quantity: number;
}

export interface CartState {
  products: CartProduct[];
}

const initialState: CartState = {
  products: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<string>) => {
      const product = state.products.find(
        (item) => item.name === action.payload,
      );

      if (product) {
        product.quantity += 1;
      } else {
        state.products.push({
          name: action.payload,
          quantity: 1,
        });
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (item) => item.name !== action.payload,
      );
    },

    cartReduceQuantity: (state, action: PayloadAction<string>) => {
      const product = state.products.find(
        (item) => item.name === action.payload,
      );

      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },
  },
});

export const { addToCart, removeFromCart, cartReduceQuantity } =
  cartSlice.actions;

export const selectCartProducts = (state: RootState) => state.cart.products;

export default cartSlice.reducer;
