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
      <div className={styles.carousel}>
        <button
          className={styles.btn}
          onClick={goBack}
        >
          <IoIosArrowBack />
        </button>
        {transitions((style, item) => (
          <animated.img
            key={item.id}
            src={process.env.PUBLIC_URL + item.src}
            alt={item.alt}
            style={{ ...style }}
            className={
              slide === item.id ?
                styles.slide :
                styles.slide_hidden
            }
          />
        ))}
        <button
          className={styles.btn}
          onClick={goForward}
        >
          <IoIosArrowForward />
        </button>
      </div>
      <span className={styles.indicators}>
        {data.map(data => (
          <button
            key={data.id}
            className={
              slide === data.id ?
                styles.indicator && styles.indicator_active
                : styles.indicator
            }
            onClick={() => setSlide(data.id)}
          >
          </button>
        ))}
      </span>
    </div>
  );
};
