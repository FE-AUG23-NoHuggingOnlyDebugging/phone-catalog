import styles from './ProductsSlider.module.scss';

import React, { useEffect, useRef, useState } from 'react';
import ProductList from '../ProductList/ProductList';
import cn from 'classnames';
import ProductLoader from '../ProductLoader/ProductLoader';
import {Product} from '../../types/Product';
import {useAppSelector} from '../../store/hooks';
import {selectProducts} from '../../store/productsSlice';

type Props = {
  title: string;
  status: boolean;
  products?: Product[] | null;
};

const ProductsSlider: React.FC<Props> = ({ title, status, products = null }) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [parentWidth, setParentWidth] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const productSlice = useAppSelector(selectProducts);

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
  let blockWidth = ((parentWidth + 16) / parentWidth) * 100;
  let maxTranslateX = products?.length
    ? (-blockWidth * (products?.length - 4)) / 4
    : 0;

  if (parentWidth < 1136) {
    const oneBlockWidth = parentWidth > 591 ? 237 : 212;
    const countBlockGap = parentWidth / (oneBlockWidth + 16.3);
    const countBlockFloor = Math.floor(countBlockGap);
    blockWidth = ((oneBlockWidth + 16) / parentWidth) * countBlockFloor * 100;
    maxTranslateX = products?.length
      ? -(products?.length / countBlockGap - 1) * 100
      : 0;
  }

  console.log(translateX, maxTranslateX);

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

      {status ? (
        <ProductLoader type="slider" />
      ) : (
        <ProductList
          products={products || productSlice}
          type="slider"
          translateX={translateX}
        />
      )}
    </section>
  );
};

export default ProductsSlider;
