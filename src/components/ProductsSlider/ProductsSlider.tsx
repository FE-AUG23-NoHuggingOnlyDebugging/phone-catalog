import styles from './ProductsSlider.module.scss';

import React, { useEffect, useRef, useState } from 'react';
import ProductList from '../ProductList/ProductList';
import cn from 'classnames';
import { useAppSelector } from '../../store/hooks';
import { selectProducts } from '../../store/productsSlice';

type Props = {
  title: string;
};

const ProductsSlider: React.FC<Props> = ({ title }) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [parentWidth, setParentWidth] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const products = useAppSelector(selectProducts);

  useEffect(() => {
    const handleResize = () => {
      if (parentRef.current) {
        const newWidth = parentRef.current.offsetWidth;

        if (parentWidth !== newWidth) {
          setParentWidth(newWidth);
          setTranslateX(0);
        }
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [parentRef, parentWidth]);

  // const blockWidth = (((parentWidth - 16 * 3) / 4 + 16) / parentWidth) * 100;
  const blockWidth = ((parentWidth + 16) / parentWidth) * 100;
  const maxTranslateX = (-blockWidth * (products.length - 4)) / 4;

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
    <section className={styles.product_slider} ref={parentRef}>
      <div className={styles.product_slider__header}>
        <h2 className={styles.product_slider__title}>{title}</h2>

        <div className={styles.swiper}>
          <button
            type="button"
            className={cn(styles.swiper__button, {
              [styles.swiper__disabled]: translateX === 0,
            })}
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
            className={cn(styles.swiper__button, {
              [styles.swiper__disabled]: translateX === maxTranslateX,
            })}
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

      <ProductList products={products} type="slider" translateX={translateX} />
    </section>
  );
};

export default ProductsSlider;