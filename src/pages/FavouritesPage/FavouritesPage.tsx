'use strict';

import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from '../../components/ProductList/ProductList';
import { selectFavoritesProducts } from '../../store/favoriteSlice';
import styles from './FavouritesPage.module.scss';
import { useAppSelector } from '../../store/hooks';
import { CartSkeletonLoader } from '../../components/CartSkeletonLoader';
import { Product } from '../../types/Product';

export const FavouritesPage = () => {
  const [products] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const cartStorageList = useAppSelector(selectFavoritesProducts);

  useEffect(() => {
    const getCart = async () => {
      try {
        const requests = await axios.get<Product>(
          `https://fe-aug23-nohuggingonlydebugging-phone.onrender.com/products/favorites?itemIds=${JSON.stringify(cartStorageList)}`,
        );
        console.log(requests);

        // const responses = await Promise.all(requests);

        // const updatedProducts = responses.map((res) => res.data);

        // setProducts(updatedProducts);
      } catch (error) {
        console.error('Сталася помилка при отриманні даних:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getCart();
  }, [cartStorageList]);

  return (
    <>
      <h1>FavouritesPage</h1>

      {isLoading && [1, 2, 3].map((item) => <CartSkeletonLoader key={item} />)}

      {isError && (
        <p className={styles.error_message}>
          An error occured while recieving data
        </p>
      )}
      <ProductList products={products} />
    </>
  );
};
