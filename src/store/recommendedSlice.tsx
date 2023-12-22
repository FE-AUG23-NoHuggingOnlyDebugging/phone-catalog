'use strict';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {Product} from '../types/Product';
import {RootState} from './store';

export interface Recommended {
  goods: Product[];
  recommendedLoadingStatus: 'idle' | 'loading' | 'error';
}

const initialState: Recommended = {
  goods: [],
  recommendedLoadingStatus: 'loading',
};

export const fetchRecommended = createAsyncThunk(
  'fetchRecommended',
  async (id: string) => {
    const response = await axios.get(
      `https://fe-aug23-nohuggingonlydebugging-phone.onrender.com/products/${id}/recommended`,
    );
    return response.data; // Explicitly return the data from the axios call
  }
);

export const recommendedSlice = createSlice({
  name: 'recommended',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommended.pending, (state) => {
        state.recommendedLoadingStatus = 'loading';
      })
      .addCase(fetchRecommended.fulfilled, (state, action) => {
        state.recommendedLoadingStatus = 'idle';
        state.goods = action.payload;
      })
      .addCase(fetchRecommended.rejected, (state) => {
        state.recommendedLoadingStatus = 'error';
      })
      .addDefaultCase(() => { });
  }
});

export const selectRecommended = (state: RootState) => state.recommended.goods;
export const selectRecommendedLoadingStatus = (state: RootState) => state.recommended.recommendedLoadingStatus;

export default recommendedSlice.reducer;
