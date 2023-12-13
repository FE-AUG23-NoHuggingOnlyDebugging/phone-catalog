'use strict';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../../components/Pagination'; // модуль в розробці
// import Dropdown from '../../components/Dropdown'; модуль в розробці
import ProductItem from '../../components/ProductItem';
import { Phone } from '../../types/Phone';
import styles from './ProductPage.module.scss';

export const ProductPage = () => {
  const [products, setProducts] = useState<Phone[]>([]);
  const [total, setTotal] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const perPage = searchParams.get('perPage');

  let API_URL = 'https://fe-aug23-nohuggingonlydebugging-phone.onrender.com/products';

  if (searchParams) {
    API_URL = API_URL + '?' + searchParams.toString();
  }

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(API_URL)
      .then((res) => {
        setProducts(res.data.records);
        setTotal(res.data.totalRecords);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, [sort, perPage]);

  return (
    <main className={`${styles.wrapper} ${styles.catalog}`}>

      <section className={styles.catalog__info}>
        <h2 className={styles.catalog__title}>Mobile phones</h2>
        <p className={styles.catalog__modelCount}>{total}</p>
      </section>

      <section className={styles.catalog__filters}>
        <div>
          <p className={styles.catalog__filters_title}>Sort by</p>
          <select
            onChange={(e) => {
              setSearchParams(searchParams => {
                searchParams.set('sort', e.target.value);
                return searchParams;
              });
            }}>
            <option value='age'>Newest</option>
            <option value='title'>Alphabetically</option>
            <option value='price'>Price</option>

          </select>
        </div>
        <div>
          <p className={styles.catalog__filters_title}>Items on page</p>
          <select
            onChange={(e) => {
              setSearchParams(searchParams => {
                searchParams.set('perPage', e.target.value);
                return searchParams;
              });
            }}>
            {['4', '8', '16', 'all'].map(item => (
              <option value={item} key={item}>{item}</option>
            ))}
          </select>
        </div>

      </section>
      {!isLoading ? (
        <section className={styles.catalog__products}>

          {products.map(product => <ProductItem product={product} key={product.id} />)}

        </section>
      )
        : <p>Loading ...</p>}
      {isError && <p>Error...</p>}

      <Pagination />
    </main>
  );
};
