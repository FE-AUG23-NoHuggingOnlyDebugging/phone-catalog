import { useCallback, useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useTransition, animated } from 'react-spring';

import styles from '../SliderPromo/SliderPromo.module.scss';
import sliderPromoData from './data/sliderPromoData.json';

export const SliderPromo = () => {
  const data = sliderPromoData.data;
  const [slide, setSlide] = useState(0);

  const transitions = useTransition(data[slide], {
    key: data[slide].id,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 1 },
  });

  const goForward = useCallback(() => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
  }, [slide, data.length]);

  const goBack = () => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
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
        {transitions((style, item) => (
          <animated.img
            key={item.id}
            src={process.env.PUBLIC_URL + item.src}
            alt={item.alt}
            style={{ ...style }}
            className={
              slide === item.id
                ? styles.carousel__slide
                : styles.carousel__slide_hidden
            }
          />
        ))}
        <button className={styles.carousel__btn} onClick={goForward}>
          <IoIosArrowForward />
        </button>
      </div>
      <span className={styles.indicators}>
        {data.map((data) => (
          <button
            key={data.id}
            className={
              slide === data.id
                ? styles.indicators__indicator &&
                  styles.indicators__indicator_active
                : styles.indicators__indicator
            }
            onClick={() => setSlide(data.id)}
          ></button>
        ))}
      </span>
    </div>
  );
};
