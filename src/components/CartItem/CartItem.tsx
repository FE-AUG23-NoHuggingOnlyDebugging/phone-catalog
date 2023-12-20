'use strict';

import cn from 'classnames';
import styles from './CartItem.module.scss';
import React from 'react';
import { ProductDetails } from '../../types/ProductDetails';
import {
  addOneMore,
  cartReduceQuantity,
  removeFromCart,
  selectCartProducts,
} from '../../store/cartSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { SyncUserDataWithServer } from '../../utils/helpers/SyncUserDataWithServer';

type Props = {
  product: ProductDetails;
  removeProduct: (id: string) => void;
};

export const CartItem: React.FC<Props> = ({ product, removeProduct }) => {
  const { id, images, name, priceDiscount } = product;
  const cartStorageList = useAppSelector(selectCartProducts);
  const dispatcher = useAppDispatch();

  const count = cartStorageList.find((item) => item.name === id)?.quantity || 0;

  const handleClickAdd = () => {
    dispatcher(addOneMore(id));
    const cart = JSON.stringify({
      cart: cartStorageList.map((elem) => {
        if (elem.name === id) {
          return {
            ...elem,
            quantity: elem.quantity + 1,
          };
        }

        return elem;
      }),
    });
    SyncUserDataWithServer(cart, 'cart');
  };

  const handleClickRemove = () => {
    removeProduct(id);
    dispatcher(removeFromCart(id));

    const cart = JSON.stringify({
      cart: cartStorageList.filter((elem) => elem.name !== id),
    });
    SyncUserDataWithServer(cart, 'cart');
  };

  const handleClickReduce = () => {
    dispatcher(cartReduceQuantity(id));

    const cart = JSON.stringify({
      cart: cartStorageList.map((elem) => {
        if (elem.name === id && elem.quantity > 1) {
          return {
            ...elem,
            quantity: elem.quantity - 1,
          };
        }

        return elem;
      }),
    });
    SyncUserDataWithServer(cart, 'cart');
  };

  return (
    <>
      <article className={styles.card}>
        <div className={styles.first_part}>
          <button
            type="button"
            onClick={handleClickRemove}
            className={styles.remove_button}
          >
            <img
              src={process.env.PUBLIC_URL + '/img/icons/close.png'}
              alt="remove"
              className={styles.icon}
            />
          </button>

          <div className={styles.photo_container}>
            <img
              src={images[0]}
              alt="phone photo"
              className={styles.photo_container__image}
            />
          </div>

          <span className={styles.name}>{name}</span>
        </div>

        <div className={styles.second_part}>
          <div className={styles.device_count}>
            <button
              type="button"
              className={cn(styles.button, {
                [styles.button__border]: count > 1,
                [styles.button__border__disabled]: count <= 1,
              })}
              onClick={handleClickReduce}
              disabled={count <= 1}
            >
              <img
                src={process.env.PUBLIC_URL + '/img/icons/minus.png'}
                alt="minus"
                className={`${styles.icon} ${styles.dark_theme_icon_color}`}
              />
            </button>

            <span className={styles.quantity}>{count}</span>

            <button
              type="button"
              className={`${styles.button} ${styles.button__border}`}
              onClick={handleClickAdd}
            >
              <img
                src={process.env.PUBLIC_URL + '/img/icons/plus.png'}
                alt="plus"
                className={`${styles.icon} ${styles.dark_theme_icon_color}`}
              />
            </button>
          </div>

          <div className={styles.price}>
            <p className={styles.price_number}>{`$${priceDiscount}`}</p>
          </div>
        </div>
      </article>
    </>
  );
};
