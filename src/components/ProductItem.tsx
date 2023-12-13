import React from 'react';
import {Phone} from '../types/Phone';
import styles from './ProductItem.module.scss';

type Props = {
  product: Phone,
};

const ProductItem: React.FC<Props> = ({ product }) => {
  const {name,  price, fullPrice, image} = product;

  const featureList: Array<keyof Phone> = ['screen', 'capacity', 'ram'];

  return (
    <div className={styles.product_item}>
      <img
        src={image}
        className={styles.product_item__image}
        alt={name}
      />

      <div className={styles.product_item__info}>
        <h3 className={styles.product_item__title}>{name}</h3>
        <p>
          <span className={styles.product_item__price}>{price}</span>
          <span className={styles.product_item__fullPrice}>{fullPrice}</span>
        </p>
        <ul className={styles.product_item__features}>
          {featureList.map(feature => {
            const featToStr = (product[feature as keyof Phone] as string);

            const featCheck = featToStr.includes('MB')
              ? (() => {
                const gigabytes = Math
                  .floor(Number(featToStr.replace('MB', '')) / 1000);

                return gigabytes !== 0 ? `${gigabytes} GB` : featToStr.replace('MB', ' MB');
              })()
              : featToStr;

            return feature.length > 0 && (
              <li className={styles.product_item__feature}>
                <span >
                  {feature}
                </span>
                <span className={styles.product_item__feature_value}>
                  {featCheck}
                </span>
              </li>
            );
          })}
        </ul>
        <div className={styles.product_item__buttons}>
          <button className={styles.product_item__add_cart} type="button">
            Add to cart
          </button>

          <button className={styles.product_item__add_favourites} type="button">
            <img src={process.env.PUBLIC_URL + '/img/icon/favourites.png'} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
