'use strict';

import { useEffect, useState } from 'react';
import cn from 'classnames';
import { CartItem } from '../../components/CartItem';
import styles from './CartPage.module.scss';
import { client } from '../../utils/http/fetchClient';
import { ProductDetails } from '../../types/ProductDetails';
import { useAppSelector } from '../../store/hooks';
import { selectCartProducts } from '../../store/cartSlice';

export const CartPage = () => {
  const [products, setProducts] = useState<ProductDetails[]>([]);

  const cartStorageList = useAppSelector(selectCartProducts);
  console.log(cartStorageList);

  useEffect(() => {
    cartStorageList.forEach(item => {
      client.get<ProductDetails>(`/products/${item.name}`)
        .then(res =>
          setProducts(curr => [...curr, res])
        )
        .catch((error) => {
          console.error('Сталася помилка при отриманні даних:', error);
        });
    });
  }, []);

  let totalSum = 0;
  products.forEach(product => {
    const productInfo = cartStorageList.find(item => item.name === product.id);

    if (productInfo) {
      totalSum += product.priceDiscount * productInfo.quantity;
    }
  });

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
        <a href="#" className={styles.link}>
          <img
            src={process.env.PUBLIC_URL + '/images/icons/arrow-left.png'}
            alt="Left arrow"
            className={styles.icon}
          />
          <span className={styles.text}>Back</span>
        </a>

        <h1 className={styles.title}>Cart</h1>
      </div>

      {products.length > 0
        ? (
          <div className={styles.cart_content}>
            <div className={styles.cards}>
              {products.map(product => <CartItem product={product} key={product.id} />)}
            </div>

            <div className={styles.total_price}>
              <h2 className={styles.price}>{`$${totalSum}`}</h2>
              <p className={styles.price_text}>{`Total for ${products.length} items`}</p>
              <a href="#" className={styles.checkout_button}>
                Checkout
              </a>
            </div>
          </div>
        )
        : (
          <p className={styles.empty_cart_message}>Your cart is empty</p>
        )}
    </div>
  );
};
