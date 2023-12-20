'use strict';

import ProductsSlider from '../../components/ProductsSlider/ProductsSlider';
import { SliderPromo } from '../../components/SliderPromo/SliderPromo';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CategoryList from '../../components/CategoryList/CategoryList';

const API_URL_HOT =
  'https://fe-aug23-nohuggingonlydebugging-phone.onrender.com/products/new';

const API_URL_DISCOUNT =
  'https://fe-aug23-nohuggingonlydebugging-phone.onrender.com/products/discount';
export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [productsHot, setProductsHot] = useState([]);
  const [productsDiscount, setProductsDiscount] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL_HOT}`)
      .then((res) => {
        setProductsHot(res.data.records);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error('Сталася помилка при отриманні даних:', e);
      });
  });

  useEffect(() => {
    axios
      .get(`${API_URL_DISCOUNT}`)
      .then((res) => {
        setProductsDiscount(res.data.records);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error('Сталася помилка при отриманні даних:', e);
      });
  });

  return (
    <>
      <SliderPromo />
      <ProductsSlider
        title="Brand new models"
        status={isLoading}
        products={productsHot}
      />
      <CategoryList />
      <ProductsSlider
        title="Hot prices"
        status={isLoading}
        products={productsDiscount}
      />
    </>
  );
};
