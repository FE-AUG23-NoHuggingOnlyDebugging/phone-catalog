'use strict';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Data } from '../types/SliderPromo';
import { RootState } from './store';

export interface Carousel {
  goods: Data[];
  carouselStatus: 'idle' | 'loading' | 'error';
}

const initialState: Carousel = {
  goods: [],
  carouselStatus: 'loading',
};

export const fetchCarousel = createAsyncThunk('fetchCarousel', async () => {
  const response = await axios.get(
    'https://fe-aug23-nohuggingonlydebugging-phone.onrender.com/static/slider',
  );
  return response.data.images; // Explicitly return the data from the axios call
});

export const carouselSlice = createSlice({
  name: 'carousel',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarousel.pending, (state) => {
        state.carouselStatus = 'loading';
      })
      .addCase(fetchCarousel.fulfilled, (state, action) => {
        state.carouselStatus = 'idle';
        state.goods = action.payload;
      })
      .addCase(fetchCarousel.rejected, (state) => {
        state.carouselStatus = 'error';
      })
      .addDefaultCase(() => {});
  },
});

export const selectCarousel = (state: RootState) => state.carousel.goods;
export const selectCarouselLoadingStatus = (state: RootState) =>
  state.carousel.carouselStatus;

export default carouselSlice.reducer;
