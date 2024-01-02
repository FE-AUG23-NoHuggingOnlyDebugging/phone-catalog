'use strict';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../types/Product';
import { RootState } from './store';

export interface ProductDiscount {
  goods: Product[];
  productDiscountStatus: 'idle' | 'loading' | 'error';
}

const initialState: ProductDiscount = {
  goods: [],
  productDiscountStatus: 'loading',
};

export const fetchProductDiscount = createAsyncThunk(
  'fetchProductDiscount',
  async () => {
    const response = await axios.get(
      'https://phone-catalog-api-docker.onrender.com/products/discount',
    );
    return response.data.records;
  },
);

export const productDiscountSlice = createSlice({
  name: 'productDiscount',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDiscount.pending, (state) => {
        state.productDiscountStatus = 'loading';
      })
      .addCase(fetchProductDiscount.fulfilled, (state, action) => {
        state.productDiscountStatus = 'idle';
        state.goods = action.payload;
      })
      .addCase(fetchProductDiscount.rejected, (state) => {
        state.productDiscountStatus = 'error';
      })
      .addDefaultCase(() => {});
  },
});

export const selectProductDiscount = (state: RootState) =>
  state.productDiscount.goods;
export const selectProductDiscountLoadingStatus = (state: RootState) =>
  state.productDiscount.productDiscountStatus;

export default productDiscountSlice.reducer;
