'use strict';

import ProductsSlider from '../../components/ProductsSlider/ProductsSlider';
import { SliderPromo } from '../../components/SliderPromo/SliderPromo';
import { useEffect } from 'react';
import CategoryList from '../../components/CategoryList/CategoryList';
import { useAppSelector, useThunkDispatch } from '../../store/hooks';
import {
  fetchProductNew,
  selectProductNew,
  selectProductNewLoadingStatus,
} from '../../store/productNewSlice';
import {
  fetchProductDiscount,
  selectProductDiscount,
  selectProductDiscountLoadingStatus,
} from '../../store/productDiscountSlice';

export const HomePage = () => {
  const dispatchProductNew = useThunkDispatch();
  const dispatchProductDiscount = useThunkDispatch();

  const productsHot = useAppSelector(selectProductNew);
  const productsDiscount = useAppSelector(selectProductDiscount);

  const productNewStatus = useAppSelector(selectProductNewLoadingStatus);
  const productDiscountStatus = useAppSelector(
    selectProductDiscountLoadingStatus,
  );

  useEffect(() => {
    dispatchProductNew(fetchProductNew());
  }, []);

  useEffect(() => {
    dispatchProductDiscount(fetchProductDiscount());
  }, []);

  return (
    <>
      <SliderPromo />
      <ProductsSlider
        title="Brand new models"
        status={productNewStatus === 'loading'}
        products={productsHot}
      />
      <CategoryList />
      <ProductsSlider
        title="Hot prices"
        status={productDiscountStatus === 'loading'}
        products={productsDiscount}
      />
    </>
  );
};
