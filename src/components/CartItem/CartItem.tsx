'use strict';

import cn from 'classnames';
import styles from './CartItem.module.scss';
import React from 'react';
import { ProductDetails } from '../../types/ProductDetails';
import { useDispatch } from 'react-redux';
import {
  addOneMore,
  cartReduceQuantity,
  removeFromCart,
  selectCartProducts,
} from '../../store/cartSlice';
import { useAppSelector } from '../../store/hooks';

type Props = {
  product: ProductDetails;
  removeProduct: (id: string) => void;
};

export const CartItem: React.FC<Props> = ({ product, removeProduct }) => {
  const { id, images, name, priceDiscount } = product;

  const dispatch = useDispatch();
  const cartStorageList = useAppSelector(selectCartProducts);

  const count = cartStorageList.find((item) => item.name === id)?.quantity || 0;

  const handleClickAdd = () => {
    dispatch(addOneMore(id));
  };

  const handleClickRemove = () => {
    removeProduct(id);
    dispatch(removeFromCart(id));
  };

  const handleClickReduce = () => {
    dispatch(cartReduceQuantity(id));
  };

  return (
    <>
      <article className={styles.card}>
        <div className={styles.first_part}>
          <button
            type="button"
            onClick={handleClickRemove}
            className={styles.button}
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
                className={styles.icon}
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
                className={styles.icon}
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
