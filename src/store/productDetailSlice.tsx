'use strict';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {RootState} from './store';
import {ProductDetails} from '../types/ProductDetails';

export interface ProductDetail {
  goods: ProductDetails | null;
  productDetailLoadingStatus: 'idle' | 'loading' | 'error';
}

const initialState: ProductDetail = {
  goods: null,
  productDetailLoadingStatus: 'loading',
};

export const fetchProductDetail = createAsyncThunk(
  'fetchProductDetail',
  async ({ type, id }: { type: string, id: string }) => {
    const response = await axios.get(
      `https://fe-aug23-nohuggingonlydebugging-phone.onrender.com/${type}/${id}`,
    );
    return response.data; // Explicitly return the data from the axios call
  }
);

export const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetail.pending, (state) => {
        state.productDetailLoadingStatus = 'loading';
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.productDetailLoadingStatus = 'idle';
        state.goods = action.payload;
      })
      .addCase(fetchProductDetail.rejected, (state) => {
        state.productDetailLoadingStatus = 'error';
      })
      .addDefaultCase(() => { });
  }
});

export const selectProductDetail = (state: RootState) => state.productDetail.goods;
export const selectProductDetailLoadingStatus = (state: RootState) => state.productDetail.productDetailLoadingStatus;

export default productDetailSlice.reducer;
