import styles from './ProductList.module.scss';

import React from 'react';
import cn from 'classnames';
import { Product } from '../../types/Product';
import ProductCard from '../ProductCard/ProductCard';
import Pagination from '../Pagination/Pagination';
import { InfoPage } from '../../types/InfoPage';

type Props = {
  products: Product[];
  type?: string | null;
  infoPage?: InfoPage | null;
  translateX?: number;
};

const ProductList: React.FC<Props> = ({
  products,
  type = null,
  infoPage = null,
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
          <ProductCard key={product.id} product={product} type={type} />
        ))}
      </div>
      {type !== 'slider' && infoPage !== null && (
        <Pagination
          currentPage={infoPage.selectedPage}
          totalCount={infoPage.totalRecords}
          pageSize={infoPage.perPage}
        />
      )}
    </>
  );
};

export default ProductList;
