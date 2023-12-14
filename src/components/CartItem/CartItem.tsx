'use strict';

import cn from 'classnames';
import styles from './CartItem.module.scss';
import React from 'react';
import { ProductDetails } from '../../types/ProductDetails';
import { useDispatch } from 'react-redux';
import { addToCart, cartReduceQuantity, removeFromCart, selectCartProducts } from '../../store/cartSlice';
import { useAppSelector } from '../../store/hooks';

type Props = {
  product: ProductDetails,
};

export const CartItem: React.FC<Props> = ({ product }) => {
  const {
    id,
    images,
    name,
    priceDiscount,
  } = product;

  const dispatch = useDispatch();
  const cartStorageList = useAppSelector(selectCartProducts);

  const count = cartStorageList.find(item => item.name === id)?.quantity || 0;

  const handleClickAdd = () => {
    dispatch(addToCart(id));
  };

  const handleClickRemove = () => {
    dispatch(removeFromCart(id));
  };

  const handleClickReduce = () => {
    dispatch(cartReduceQuantity(id));
  };

  return (
    <>
      <article className={styles.card}>
        <div className={styles.first_part}>
          <a href="#/cart">
            <img
              src={process.env.PUBLIC_URL + '/images/icons/close.png'}
              alt="Close"
              className={styles.icon}
              onClick={handleClickRemove}
            />
          </a>

          <div className={styles.photo_container}>
            <img
              src={images[0]}
              alt="phone photo"
              className={styles.photo_container__image}
            />
          </div>

          <span className={styles.name}>
            {name}
          </span>
        </div>

        <div className={styles.second_part}>
          <div className={styles.device_count}>
            <a href="#/cart">
              <img
                src={process.env.PUBLIC_URL + '/images/icons/minus.png'}
                alt="minus"
                className={cn(`${styles.icon}`, {
                  [styles.icon__border]: count > 1,
                  [styles.icon_disabled]: count <= 1,
                })}
                onClick={handleClickReduce}
              />
            </a>

            <span className={styles.number}>{count}</span>

            <a href="#/cart">
              <img
                src={process.env.PUBLIC_URL + '/images/icons/plus.png'}
                alt="plus"
                className={`${styles.icon} ${styles.icon__border}`}
                onClick={handleClickAdd}
              />
            </a>
          </div>

          <div className={styles.price}>
            <p className={styles.price_number}>{`$${priceDiscount}`}</p>
          </div>
        </div>
      </article>
    </>
  );
};
