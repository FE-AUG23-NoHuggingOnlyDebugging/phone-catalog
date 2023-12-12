import styles from './ProductCard.module.scss';
import React from 'react';
import cn from 'classnames';
import { Product } from '../../types/Product';
import AddToCard from '../AddToCard/AddToCard';
import AddToFavorite from '../AddToFavorite/AddToFavorite';
import { useAppSelector } from '../../store/hooks';
import { selectFavoritesProducts } from '../../store/favoriteSlice';
import { selectCartProducts } from '../../store/cartSlice';
import { Link } from 'react-router-dom';

type Props = {
  product: Product;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  const favoritesStorageList = useAppSelector(selectFavoritesProducts);
  const cartStorageList = useAppSelector(selectCartProducts);
  const withDiscount = (price: number, discount: number) => {
    return (
      <>
        {discount}
        <span className={styles.product_item__fullPrice}>{price}</span>
      </>
    );
  };

  const featureList: Array<keyof Product> = ['screen', 'capacity', 'ram'];

  return (
    <div className={styles.product_item}>
      <Link
        to={'/product' + product.phoneId}
        className={styles.link__cover}
      ></Link>

      <img
        src={product.image}
        className={styles.product_item__image}
        alt={product.name}
      />

      <div className={styles.product_item__info}>
        <h3 className={styles.product_item__title}>{product.name}</h3>
        <p className={styles.product_item__price}>
          {product.price <= 0
            ? product.fullPrice
            : withDiscount(product.fullPrice, product.price)}
        </p>
        <ul className={styles.product_item__features}>
          {featureList.map((feature) => {
            const featFixCap = (
              product[feature as keyof Product] as string
            ).replace('GB', ' GB');

            return (
              feature.length > 0 && (
                <li className={styles.product_item__feature}>
                  <span
                    className={cn(
                      [styles.product_item__feature_title],
                      { [styles.text__first_upper]: feature !== 'ram' },
                      { [styles.text__upper]: feature === 'ram' },
                    )}
                  >
                    {feature}
                  </span>
                  <span className={styles.product_item__feature_value}>
                    {featFixCap}
                  </span>
                </li>
              )
            );
          })}
        </ul>
        <div className={styles.product_item__buttons}>
          <AddToCard
            added={cartStorageList.includes(product.phoneId)}
            id={product.phoneId}
          />

          <AddToFavorite
            added={favoritesStorageList.includes(product.phoneId)}
            id={product.phoneId}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
