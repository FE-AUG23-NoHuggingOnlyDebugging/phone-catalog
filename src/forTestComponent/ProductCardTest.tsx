'use strict';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import ProductsSlider from '../components/ProductsSlider/ProductsSlider';
import { useDispatch } from 'react-redux';
import { selectProducts, setProducts } from '../store/productsSlice';
import ProductList from '../components/ProductList/ProductList';
import { useAppSelector } from '../store/hooks';
import { InfoPage } from '../types/InfoPage';
import { useSearchParams } from '../utils/useSearchParams';

const API_URL =
  'https://fe-aug23-nohuggingonlydebugging-phone.onrender.com/products';

const ProductCardTest: React.FC = () => {
  const [infoPage, setInfoPage] = useState<InfoPage>();
  const dispatch = useDispatch();
  const products = useAppSelector(selectProducts);
  const { page, perPage, sort } = useSearchParams();

  useEffect(() => {
    axios
      .get(`${API_URL}?page=${page}&perPage=${perPage}&sort=${sort}`)
      .then((res) => {
        dispatch(setProducts(res.data.records));
        setInfoPage(res.data.info);
      })
      .catch((e) => {
        console.error('Сталася помилка при отриманні даних:', e);
      });
  }, [page, perPage, sort]);

  // return <ProductsSlider title="Test" />;
  return <ProductList products={products} infoPage={infoPage} />;
};

export default ProductCardTest;
