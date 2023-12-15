'use strict';

import { useEffect, useState } from 'react';
import cn from 'classnames';
import { CartItem } from '../../components/CartItem';
import styles from './CartPage.module.scss';
import { ProductDetails } from '../../types/ProductDetails';
import { useAppSelector } from '../../store/hooks';
import { selectCartProducts } from '../../store/cartSlice';
import axios from 'axios';

export const CartPage = () => {
  const [products, setProducts] = useState<ProductDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const cartStorageList = useAppSelector(selectCartProducts);

  useEffect(() => {
    const getCart = async () => {
      try {
        const requests = cartStorageList.map((item) =>
          axios.get<ProductDetails>(
            `https://fe-aug23-nohuggingonlydebugging-phone.onrender.com/products/${item.name}`,
          ),
        );

        const responses = await Promise.all(requests);

        const updatedProducts = responses.map((res) => res.data);

        setProducts(updatedProducts);
      } catch (error) {
        console.error('Сталася помилка при отриманні даних:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getCart();
  }, [cartStorageList]);

  let totalSum = 0;
  products.forEach((product) => {
    const productInfo = cartStorageList.find(
      (item) => item.name === product.id,
    );

    if (productInfo) {
      totalSum += product.priceDiscount * productInfo.quantity;
    }
  });

  const productsCount = cartStorageList.reduce(
    (curr, next) => curr + next.quantity,
    0,
  );

  return (
    <div
      className={cn({
        [styles.page]: products.length > 0,
        [styles.empty_cart_page]: products.length === 0,
      })}
    >
      <div
        className={cn({
          [styles.cart_info]: products.length > 0,
          [styles.empty_cart_info]: products.length === 0,
        })}
      >
        <button
          type="button"
          className={styles.button}
          onClick={() => window.history.back()}
        >
          <img
            src={process.env.PUBLIC_URL + '/img/icons/arrow.png'}
            alt="left arrow"
            className={cn(styles.icon, styles.arrow__left)}
          />
          <span className={styles.text}>Back</span>
        </button>

        <h1 className={styles.title}>Cart</h1>
      </div>

      {isLoading && <p className={styles.loading_message}>Loading</p>}

      {isError && (
        <p className={styles.error_message}>
          An error occured while recieving data
        </p>
      )}

      {products.length > 0 && !isLoading && !isError && (
        <div className={styles.cart_content}>
          <div className={styles.cards}>
            {products.map((product) => (
              <CartItem product={product} key={product.id} />
            ))}
          </div>

          <div className={styles.total_price}>
            <h2 className={styles.price}>{`$${totalSum}`}</h2>
            <p
              className={styles.price_text}
            >{`Total for ${productsCount} items`}</p>
            <a href="#" className={styles.checkout_button}>
              Checkout
            </a>
          </div>
        </div>
      )}
      {!products.length && !isLoading && !isError && (
        <p className={styles.empty_cart_message}>Your cart is empty</p>
      )}
    </div>
  );
};
