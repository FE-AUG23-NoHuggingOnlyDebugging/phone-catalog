import styles from './categoryList.module.scss';

import { useAppSelector } from '../../store/hooks';
import { selectProducts } from '../../store/productsSlice';
import { Product } from '../../types/Product';
import CategoryItem from '../CategoryItem/CategoryItem';

const CategoryList = () => {
  const products = useAppSelector<Product[]>(selectProducts);
  const counterModel = (model: string) =>
    products.filter((product) => product.category === model).length;

  return (
    <section className={styles.category_list}>
      <h2 className={styles.category_list__title}>Shop by category</h2>

      <ul className={styles.category_list__content}>
        <CategoryItem
          image={{
            src: '/img/categories/category-phones.png',
            alt: 'Category Phones',
          }}
          title="Mobile phones"
          model="phones"
          modelCount={counterModel('phones')}
        />

        <CategoryItem
          image={{
            src: '/img/categories/category-tablets.png',
            alt: 'Category Tablets',
          }}
          title="Tablets"
          model="tablet"
          modelCount={counterModel('tablet')}
        />

        <CategoryItem
          image={{
            src: '/img/categories/category-accessories.png',
            alt: 'Category Accessories',
          }}
          title="Accessories"
          model="accessory"
          modelCount={counterModel('accessory')}
        />
      </ul>
    </section>
  );
};

export default CategoryList;
