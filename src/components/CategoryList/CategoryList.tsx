import styles from './categoryList.module.scss';

import CategoryItem from '../CategoryItem/CategoryItem';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {Categories} from '../../types/Categories';
import CategoryLoader from '../CategoryLoader/CategoryLoader';

const API_URL =
  'https://fe-aug23-nohuggingonlydebugging-phone.onrender.com/static/categories';
const CategoryList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState<Categories[]>([]);

  useEffect(() => {
    axios
      .get(`${API_URL}`)
      .then((res) => {
        setCategory(res.data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error('Сталася помилка при отриманні даних:', e);
      });
  }, []);

  return (
    <section className={styles.category_list}>
      <h2 className={styles.category_list__title}>Shop by category</h2>

      <ul className={styles.category_list__content}>
        {!isLoading ? (
          category.map(info => (
            <CategoryItem
              image={{
                src: info.url,
                alt: info.alt,
              }}
              title={info.alt}
              model={info.id}
              totalModel={info.total}
              key={info.id}
            />
          ))
        ) : (
          Array.from({ length: 3 }).map((_, i) => <CategoryLoader count={i + 1} key={i} />)
        )}

      </ul>
    </section>
  );
};

export default CategoryList;

