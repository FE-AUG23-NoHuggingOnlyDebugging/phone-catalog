'use strict';

import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from '../../components/ProductList/ProductList';
import { selectFavoritesProducts } from '../../store/favoriteSlice';
import styles from './FavouritesPage.module.scss';
import { useAppSelector } from '../../store/hooks';
import { Product } from '../../types/Product';

export const FavouritesPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const elements = useAppSelector(selectFavoritesProducts);

  useEffect(() => {
    const getCart = async () => {
      try {
        const itemsIds = JSON.stringify(elements);
        console.log(itemsIds);

        const request = await axios.get<Product[]>(
          `https://fe-aug23-nohuggingonlydebugging-phone.onrender.com/products/favorites/get?itemsIds=${itemsIds}`,
        );

        setProducts(request.data);
      } catch (error) {
        console.error('Сталася помилка при отриманні даних:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getCart();
  }, [elements]);

  return (
    <>
      <div className={styles.cart_info}>
        <h1 className={styles.title}>Favourites Page</h1>
        <p className={styles.modelCount}>{`${elements.length} items`}</p>
      </div>

      {isError && (
        <p className={styles.error_message}>
          An error occured while recieving data
        </p>
      )}
      <ProductList products={products} status={isLoading} />
    </>
  );
};
