'use strict';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../types/Product';
import { RootState } from './store';
import { InfoPage } from '../types/InfoPage';

export interface Pagination {
  goods: {
    records: Product[];
    info: InfoPage | null;
  };
  paginationLoadingStatus: 'idle' | 'loading' | 'error';
}

const initialState: Pagination = {
  goods: {
    records: [],
    info: null,
  },
  paginationLoadingStatus: 'loading',
};

const API_URL = 'https://phone-catalog-api-docker.onrender.com/products/';
export const fetchPagination = createAsyncThunk(
  'fetchPagination',
  async ({
    type,
    page = '1',
    perPage = '16',
    sort = '',
  }: {
    type: string;
    page: string | number;
    perPage: string | number;
    sort: string;
  }) => {
    const response = await axios.get(
      `${API_URL}${type}/?page=${page}&perPage=${perPage}&sort=${sort}`,
    );
    return response.data;
  },
);

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPagination.pending, (state) => {
        state.paginationLoadingStatus = 'loading';
      })
      .addCase(fetchPagination.fulfilled, (state, action) => {
        state.paginationLoadingStatus = 'idle';
        state.goods = action.payload;
      })
      .addCase(fetchPagination.rejected, (state) => {
        state.paginationLoadingStatus = 'error';
      })
      .addDefaultCase(() => {});
  },
});

export const selectPagination = (state: RootState) => state.pagination.goods;
export const selectPaginationLoadingStatus = (state: RootState) =>
  state.pagination.paginationLoadingStatus;

export default paginationSlice.reducer;
