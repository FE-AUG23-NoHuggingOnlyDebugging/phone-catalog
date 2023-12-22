'use strict';

import axios from 'axios';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import { selectFavoritesProducts } from '../../store/favoriteSlice';
import styles from './FavouritesPage.module.scss';
import { useAppSelector } from '../../store/hooks';
import { Product } from '../../types/Product';
import { CheckoutModal } from '../../components/CheckoutModal';

export const FavouritesPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const elements = useAppSelector(selectFavoritesProducts);

  const [isModalShown, setIsModalShown] = useState(false);

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

  const handleShowModal = () => {
    setIsModalShown(true);
  };

  const handleCloseClick = () => {
    setIsModalShown(false);
  };

  return (
    <>
      <div
        className={cn(styles.page, {
          [styles.page__empty]: (products.length <= 1 || isError) && !isLoading,
        })}
      >
        <div className={styles.favorites_info}>
          <h1 className={styles.title}>Favourites Page</h1>
          <p className={styles.modelCount}>{`${elements.length} items`}</p>
        </div>

        {isError && (
          <p className={styles.error_message}>
            An error occurred while receiving data
          </p>
        )}

        <ProductList
          products={products}
          status={isLoading}
          showModal={handleShowModal}
        />
      </div>

      {isModalShown && (
        <CheckoutModal
          status="registerRequired"
          handleCloseClick={handleCloseClick}
        />
      )}
    </>
  );
};
