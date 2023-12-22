'use strict';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';
import { Categories } from '../types/Categories';

export interface Category {
  goods: Categories[];
  categoryStatus: 'idle' | 'loading' | 'error';
}

const initialState: Category = {
  goods: [],
  categoryStatus: 'loading',
};

export const fetchCategory = createAsyncThunk('fetchCategory', async () => {
  const response = await axios.get(
    'https://fe-aug23-nohuggingonlydebugging-phone.onrender.com/static/categories',
  );
  return response.data; // Explicitly return the data from the axios call
});

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.categoryStatus = 'loading';
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.categoryStatus = 'idle';
        state.goods = action.payload;
      })
      .addCase(fetchCategory.rejected, (state) => {
        state.categoryStatus = 'error';
      })
      .addDefaultCase(() => {});
  },
});

export const selectCategory = (state: RootState) => state.category.goods;
export const selectCategoryLoadingStatus = (state: RootState) =>
  state.category.categoryStatus;

export default categorySlice.reducer;
