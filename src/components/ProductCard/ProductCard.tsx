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
  type?: string | null;
};

const ProductCard: React.FC<Props> = ({ product, type }) => {
  const favoritesStorageList = useAppSelector(selectFavoritesProducts);
  const cartStorageList = useAppSelector(selectCartProducts);
  const withDiscount = (price: number, discount: number) => {
    return (
      <>
        {discount}
        <span className={styles.product_card__fullPrice}>{price}</span>
      </>
    );
  };

  const featureList: Array<keyof Product> = ['screen', 'capacity', 'ram'];

  return (
    <div
      className={cn(styles.product_card, {
        [styles.product_card__slide]: type === 'slider',
        [styles.product_card__list]: type !== 'list',
      })}
    >
      <Link
        to={'/product/'+ product.category + '/' + product.itemId}
        className={styles.link__cover}
      ></Link>

      <img
        src={product.image}
        className={styles.product_card__image}
        alt={product.name}
      />

      <div className={styles.product_card__info}>
        <h3 className={styles.product_card__title}>{product.name}</h3>
        <p className={styles.product_card__price}>
          {product.price <= 0
            ? product.fullPrice
            : withDiscount(product.fullPrice, product.price)}
        </p>
        <ul className={styles.product_card__features}>
          {featureList.map((feature) => {
            const featFixCap = (
              product[feature as keyof Product] as string
            ).replace('GB', ' GB');

            return (
              feature.length > 0 && (
                <li className={styles.product_card__feature} key={feature}>
                  <span
                    className={cn(
                      [styles.product_card__feature_title],
                      { [styles.text__first_upper]: feature !== 'ram' },
                      { [styles.text__upper]: feature === 'ram' },
                    )}
                  >
                    {feature}
                  </span>
                  <span className={styles.product_card__feature_value}>
                    {featFixCap}
                  </span>
                </li>
              )
            );
          })}
        </ul>
        <div className={styles.product_card__buttons}>
          <AddToCard
            added={cartStorageList.some(
              (cartProduct) => cartProduct.name === product.itemId,
            )}
            id={product.itemId}
          />

          <AddToFavorite
            added={favoritesStorageList.includes(product.itemId)}
            id={product.itemId}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
