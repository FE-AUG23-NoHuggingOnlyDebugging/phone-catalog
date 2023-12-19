import ProductCardLoader from '../ProductCardLoader/ProductCardLoader';
import cn from 'classnames';
import styles from '../ProductCardLoader/ProductCardLoader.module.scss';
import React from 'react';

type Props = {
  type?: string | null;
  perPage?: number;
};

const ProductLoader: React.FC<Props> = ({ type = null, perPage = 16 }) => {
  const getPerPage = type === 'slider' ? 4 : perPage;

  const content = Array.from({ length: getPerPage }, (_, index) => (
    <ProductCardLoader type={type} key={index} />
  ));

  return (
    <div
      className={cn(styles.products, {
        [styles.products__slider]: type === 'slider',
      })}
    >
      {content}
    </div>
  );
};

export default ProductLoader;
