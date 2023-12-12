import styles from './ProductsSlider.module.scss';

import React, {useState} from 'react';
import { Product } from '../../types/Product';
import Products from '../Products/Products';
import cn from 'classnames';

type Props = {
  title: string;
  products: Product[];
};

const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const [translateX, setTranslateX] = useState(0);
  const blockWidth = 25.35;
  const maxTranslateX = -blockWidth * (products.length - 4);

  const handleBack = () => {
    setTranslateX((prevTranslateX) => {
      const nextTranslateX = prevTranslateX + blockWidth;
      return nextTranslateX <= 0 ? nextTranslateX : 0;
    });
  };

  const handleNext = () => {
    setTranslateX((prevTranslateX) => {
      const nextTranslateX = prevTranslateX - blockWidth;
      return nextTranslateX > maxTranslateX ? nextTranslateX : maxTranslateX;
    });
  };

  return (
    <section className={styles.product_slider}>
      <div className={styles.product_slider__header}>
        <h2 className={styles.product_slider__title}>{title}</h2>

        <div className={styles.swiper}>
          <button
            type="button"
            className={cn(styles.swiper__button, {[styles.swiper__disabled]: translateX === 0})}
            onClick={handleBack}
            disabled={translateX === 0}
          >
            <img
              src={process.env.PUBLIC_URL + '/img/icons/arrow.png'}
              alt="Left Arrow"
              className={styles.arrow__left}
            />
          </button>

          <button
            type="button"
            className={cn(styles.swiper__button, {[styles.swiper__disabled]: translateX === maxTranslateX})}
            onClick={handleNext}
            disabled={translateX === maxTranslateX}
          >
            <img
              src={process.env.PUBLIC_URL + '/img/icons/arrow.png'}
              alt="Right Arrow"
              className={styles.arrow__right}
            />
          </button>
        </div>
      </div>

      <Products products={products} type="slider" translateX={translateX} />
    </section>
  );
};

export default ProductsSlider;
