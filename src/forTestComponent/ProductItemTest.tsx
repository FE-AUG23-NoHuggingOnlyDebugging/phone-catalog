'use strict';

import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Product} from '../types/Product';
import ProductItem from '../components/ProductItem/ProductItem';
import ProductsSlider from "../components/ProductsSlider/ProductsSlider";
const API_URL = 'https://fe-aug23-nohuggingonlydebugging-phone.onrender.com/phone';

const ProductItemTest: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get(API_URL)
      .then(res => {
        setProducts(res.data);
        console.log(res.data);
      })
      .catch(error => {
        console.error('Сталася помилка при отриманні даних:', error);
      });
  }, []);

  return (
    <ProductsSlider products={products} title='Test' />
  );
};

export default ProductItemTest;
