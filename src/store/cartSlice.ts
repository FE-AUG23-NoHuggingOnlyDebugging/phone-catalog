import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface CartProduct {
  name: string;
  quantity: number;
  category: string;
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
    addToCart: (
      state,
      action: PayloadAction<{ id: string; category: string }>,
    ) => {
      state.products.push({
        name: action.payload.id,
        category: action.payload.category,
        quantity: 1,
      });
    },

    addOneMore: (state, action: PayloadAction<string>) => {
      const product = state.products.find(
        (item) => item.name === action.payload,
      );

      if (product) {
        product.quantity += 1;
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

    clearCart: (state) => {
      state.products = [];
    },

    replaceCart: (state, action: PayloadAction<CartProduct[]>) => {
      const uniqueObjectsMap = new Map();

      state.products.forEach(item => {
        uniqueObjectsMap.set(item.name, item);
      });

      action.payload.forEach(item => {
        if (!uniqueObjectsMap.has(item.name)) {
          uniqueObjectsMap.set(item.name, item);
        }
      });

      const uniqueObjects = Array.from(uniqueObjectsMap.values());
      state.products = uniqueObjects;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  cartReduceQuantity,
  addOneMore,
  clearCart,
  replaceCart,
} = cartSlice.actions;

export const selectCartProducts = (state: RootState) => state.cart.products;

export default cartSlice.reducer;
