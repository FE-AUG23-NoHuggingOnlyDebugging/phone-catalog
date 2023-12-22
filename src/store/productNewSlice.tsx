'use strict';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../types/Product';
import { RootState } from './store';

export interface ProductNew {
  goods: Product[];
  productNewStatus: 'idle' | 'loading' | 'error';
}

const initialState: ProductNew = {
  goods: [],
  productNewStatus: 'loading',
};

export const fetchProductNew = createAsyncThunk('fetchProductNew', async () => {
  const response = await axios.get(
    'https://fe-aug23-nohuggingonlydebugging-phone.onrender.com/products/new',
  );
  return response.data.records; // Explicitly return the data from the axios call
});

export const productNewSlice = createSlice({
  name: 'productNew',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductNew.pending, (state) => {
        state.productNewStatus = 'loading';
      })
      .addCase(fetchProductNew.fulfilled, (state, action) => {
        state.productNewStatus = 'idle';
        state.goods = action.payload;
      })
      .addCase(fetchProductNew.rejected, (state) => {
        state.productNewStatus = 'error';
      })
      .addDefaultCase(() => {});
  },
});

export const selectProductNew = (state: RootState) => state.productNew.goods;
export const selectProductNewLoadingStatus = (state: RootState) =>
  state.productNew.productNewStatus;

export default productNewSlice.reducer;
