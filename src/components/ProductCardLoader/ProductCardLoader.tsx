import styles from './ProductCardLoader.module.scss';
import cn from 'classnames';
import React from 'react';

type Props = {
  type?: string | null,
};

const ProductCardLoader: React.FC<Props> = ({type = null}) => {
  return (
    <div
      className={cn(styles.product_loader, {
        [styles.product_loader__slider]: type === 'slider',
        [styles.product_loader__list]: type !== 'list',
      })}
    >
      <div className={cn(styles.product_loader__image, styles.product_loader__box)} />
      <div className={cn(styles.product_loader__title, styles.product_loader__box)} />
      <div className={cn(styles.product_loader__price, styles.product_loader__box)} />
      <ul className={styles.product_loader__list}>
        <li className={cn(styles.product_loader__item)}>
          <span className={cn(styles.product_loader__item_title, styles.product_loader__box)} />
          <span className={cn(styles.product_loader__item_value, styles.product_loader__box)} />
        </li>
        <li className={cn(styles.product_loader__item)}>
          <span className={cn(styles.product_loader__item_title, styles.product_loader__box)} />
          <span className={cn(styles.product_loader__item_value, styles.product_loader__box)} />
        </li>
        <li className={cn(styles.product_loader__item)}>
          <span className={cn(styles.product_loader__item_title, styles.product_loader__box)} />
          <span className={cn(styles.product_loader__item_value, styles.product_loader__box)} />
        </li>
      </ul>
      <div className={styles.product_loader__buttons}>
        <div className={cn(styles.product_loader__button_cart, styles.product_loader__box)} />
        <div className={cn(styles.product_loader__button_fav, styles.product_loader__box)} />
      </div>
    </div>
  );
};

export default ProductCardLoader;
