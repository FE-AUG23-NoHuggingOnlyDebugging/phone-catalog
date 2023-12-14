'use strict';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from '../../utils/useSearchParams';
import styles from './ProductPage.module.scss';
import ProductList from '../../components/ProductList/ProductList';
import { selectProducts, setProducts } from '../../store/productsSlice';
import { InfoPage } from '../../types/InfoPage';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/hooks';

export const ProductPage = () => {
  const [total, setTotal] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [infoPage, setInfoPage] = useState<InfoPage>();
  const dispatch = useDispatch();
  const products = useAppSelector(selectProducts);
  const { page, perPage, sort, setSearchParams } = useSearchParams();

  const API_URL =
    'https://fe-aug23-nohuggingonlydebugging-phone.onrender.com/products';

  useEffect(() => {
    axios
      .get(`${API_URL}?page=${page}&perPage=${perPage}&sort=${sort}`)
      .then((res) => {
        dispatch(setProducts(res.data.records));
        setInfoPage(res.data.info);
        setTotal(res.data.info.totalRecords);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsError(e);
      });
  }, [page, perPage, sort]);

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
              setSearchParams((searchParams) => {
                searchParams.set('sort', e.target.value);
                return searchParams;
              });
            }}
          >
            <option value="age">Newest</option>
            <option value="title">Alphabetically</option>
            <option value="price">Price</option>
          </select>
        </div>
        <div>
          <p className={styles.catalog__filters_title}>Items on page</p>
          <select
            onChange={(e) => {
              setSearchParams((searchParams) => {
                searchParams.set('perPage', e.target.value);
                return searchParams;
              });
            }}
          >
            {['4', '8', '16', 'all'].map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </section>
      {!isLoading ? (
        <section className={styles.catalog__products}>
          <ProductList products={products} infoPage={infoPage} />
        </section>
      ) : (
        <p>Loading ...</p>
      )}
      {isError && <p>Error...</p>}
    </main>
  );
};
