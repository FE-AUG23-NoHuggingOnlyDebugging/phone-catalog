'use strict';

import ProductsSlider from '../../components/ProductsSlider/ProductsSlider';
import { SliderPromo } from '../../components/SliderPromo/SliderPromo';
import { setProducts } from '../../store/productsSlice';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CategoryList from '../../components/CategoryList/CategoryList';

const API_URL =
  'https://fe-aug23-nohuggingonlydebugging-phone.onrender.com/products';
export const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${API_URL}`)
      .then((res) => {
        dispatch(setProducts(res.data.records));
      })
      .catch((e) => {
        console.error('Сталася помилка при отриманні даних:', e);
      });
  });

  return (
    <>
      <SliderPromo />
      <ProductsSlider title="Brand new models" />
      <CategoryList />
      <ProductsSlider title="Hot prices" />
    </>
  );
};
