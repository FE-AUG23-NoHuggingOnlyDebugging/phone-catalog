'use strict';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {Product} from '../types/Product';
import {RootState} from './store';

export interface ProductSort {
  goods: Product[];
  productSortStatus: 'idle' | 'loading' | 'error';
}

const initialState: ProductSort = {
  goods: [],
  productSortStatus: 'loading',
};

export const fetchProductSort = createAsyncThunk(
  'fetchProductSort',
  async (sort: string) => {
    const response = await axios.get(
      `https://fe-aug23-nohuggingonlydebugging-phone.onrender.com/products/${sort}`,
    );
    return response.data; // Explicitly return the data from the axios call
  }
);

export const productSortSlice = createSlice({
  name: 'productSort',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductSort.pending, (state) => {
        state.productSortStatus = 'loading';
      })
      .addCase(fetchProductSort.fulfilled, (state, action) => {
        state.productSortStatus = 'idle';
        state.goods = action.payload;
      })
      .addCase(fetchProductSort.rejected, (state) => {
        state.productSortStatus = 'error';
      })
      .addDefaultCase(() => { });
  }
});

export const selectProductSort = (state: RootState) => state.productSort.goods;
export const selectProductSortLoadingStatus = (state: RootState) => state.productSort.productSortStatus;

export default productSortSlice.reducer;
