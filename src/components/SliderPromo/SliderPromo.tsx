import { useCallback, useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useTransition, animated } from 'react-spring';

import styles from './SliderPromo.module.scss';
import cn from 'classnames';
import { useAppSelector, useThunkDispatch } from '../../store/hooks';
import {
  fetchCarousel,
  selectCarousel,
  selectCarouselLoadingStatus,
} from '../../store/carouselSlice';

export const SliderPromo = () => {
  const [slide, setSlide] = useState(0);

  const dispatchCarousel = useThunkDispatch();
  const carousel = useAppSelector(selectCarousel);
  const carouselStatus = useAppSelector(selectCarouselLoadingStatus);

  useEffect(() => {
    dispatchCarousel(fetchCarousel());
  }, []);

  const transitions = useTransition(carousel[slide], {
    key: carousel[slide]?.id,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 1 },
  });

  const goForward = useCallback(() => {
    setSlide(slide === carousel.length - 1 ? 0 : slide + 1);
  }, [slide, carousel.length]);

  const goBack = () => {
    setSlide(slide === 0 ? carousel.length - 1 : slide - 1);
  };

  useEffect(() => {
    const showSlider = setInterval(() => goForward(), 5000);

    return () => clearInterval(showSlider);
  }, [goForward]);

  return (
    <div className={styles.container}>
      <h1 className={styles.container__title}>
        Welcome to Nice Gadgets store!
      </h1>
      <div className={styles.carousel}>
        <button className={styles.carousel__btn} onClick={goBack}>
          <IoIosArrowBack />
        </button>
        {carouselStatus !== 'loading' ? (
          transitions((style, item) => (
            <>
              <animated.img
                key={item.id}
                src={item.url}
                alt={item.alt}
                style={{ ...style }}
                className={
                  slide === +item.id
                    ? styles.carousel__slide
                    : styles.carousel__slide_hidden
                }
              />
            </>
          ))
        ) : (
          <div className={styles.loader}>
            <div className={cn(styles.loader_box, styles.loader__slide)} />
          </div>
        )}
        <button className={styles.carousel__btn} onClick={goForward}>
          <IoIosArrowForward />
        </button>
      </div>
      <span className={styles.indicators}>
        {carouselStatus !== 'loading' ? (
          carousel.map((data) => (
            <button
              key={data.id}
              className={
                slide === +data.id
                  ? styles.indicators__indicator &&
                    styles.indicators__indicator_active
                  : styles.indicators__indicator
              }
              onClick={() => setSlide(+data.id)}
            ></button>
          ))
        ) : (
          <span className={cn(styles.loader_box, styles.loader__btn)} />
        )}
      </span>
    </div>
  );
};
