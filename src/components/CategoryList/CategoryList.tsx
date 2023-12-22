import styles from './categoryList.module.scss';

import CategoryItem from '../CategoryItem/CategoryItem';
import { useEffect } from 'react';
import CategoryLoader from '../CategoryLoader/CategoryLoader';
import { useAppSelector, useThunkDispatch } from '../../store/hooks';
import {
  fetchCategory,
  selectCategory,
  selectCategoryLoadingStatus,
} from '../../store/categorySlice';

const CategoryList = () => {
  const dispatchCategory = useThunkDispatch();
  const category = useAppSelector(selectCategory);
  const categoryStatus = useAppSelector(selectCategoryLoadingStatus);

  useEffect(() => {
    dispatchCategory(fetchCategory());
  }, []);

  return (
    <section className={styles.category_list}>
      <h2 className={styles.category_list__title}>Shop by category</h2>

      <ul className={styles.category_list__content}>
        {categoryStatus !== 'loading'
          ? category.map((info) => (
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
          : Array.from({ length: 3 }).map((_, i) => (
            <CategoryLoader count={i + 1} key={i} />
          ))}
      </ul>
    </section>
  );
};

export default CategoryList;
