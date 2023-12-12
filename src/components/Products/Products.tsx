import styles from './Products.module.scss';

import React from 'react';
import cn from 'classnames';
import { Product } from '../../types/Product';
import ProductItem from '../ProductItem/ProductItem';

type Props = {
  products: Product[];
  type: string | null;
  translateX?: number;
};

const Products: React.FC<Props> = ({ products, type = null, translateX = 0 }) => {
  return (
    <>
      <div
        className={cn(styles.products, {
          [styles.products__slider]: type === 'slider',
        })}
        style={{ transform: `translateX(${translateX}%)` }}
      >
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
      {/*{type === 'slider' || <Pagination />}*/}
    </>
  );
};

export default Products;
