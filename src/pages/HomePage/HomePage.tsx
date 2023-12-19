'use strict';

import ProductsSlider from '../../components/ProductsSlider/ProductsSlider';
import { SliderPromo } from '../../components/SliderPromo/SliderPromo';
import { setProducts } from '../../store/productsSlice';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CategoryList from '../../components/CategoryList/CategoryList';

const API_URL =
  'https://fe-aug23-nohuggingonlydebugging-phone.onrender.com/products/new';
export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${API_URL}`)
      .then((res) => {
        dispatch(setProducts(res.data.records));
        setIsLoading(false);
      })
      .catch((e) => {
        console.error('Сталася помилка при отриманні даних:', e);
      });
  });

  return (
    <>
      <SliderPromo />
      <ProductsSlider title="Brand new models" status={isLoading} />
      <CategoryList />
      <ProductsSlider title="Hot prices" status={isLoading} />
    </>
  );
};
