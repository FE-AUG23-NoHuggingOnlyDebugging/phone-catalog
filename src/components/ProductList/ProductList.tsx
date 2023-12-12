import styles from './ProductList.module.scss';

import React from 'react';
import cn from 'classnames';
import { Product } from '../../types/Product';
import ProductCard from '../ProductCard/ProductCard';

type Props = {
  products: Product[];
  type: string | null;
  translateX?: number;
};

const ProductList: React.FC<Props> = ({
  products,
  type = null,
  translateX = 0,
}) => {
  return (
    <>
      <div
        className={cn(styles.products, {
          [styles.products__slider]: type === 'slider',
        })}
        style={{ transform: `translateX(calc(${translateX}%)` }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {/*{type === 'slider' || <Pagination />}*/}
    </>
  );
};

export default ProductList;
