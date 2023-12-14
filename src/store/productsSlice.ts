import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Product } from '../types/Product';

export interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    products: (state) => {
      state.products;
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
});

export const { products, setProducts } = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products.products;

export default productsSlice.reducer;
