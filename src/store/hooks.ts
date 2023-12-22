import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useThunkDispatch = () =>
  useDispatch<ThunkDispatch<Product[], string, AnyAction>>();
export const useThunkDispatchSpecific = () =>
  useDispatch<ThunkDispatch<ProductDetails, string, AnyAction>>();
