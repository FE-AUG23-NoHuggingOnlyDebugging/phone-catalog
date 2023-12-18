import { useCallback, useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useTransition, animated } from 'react-spring';

import axios from 'axios';

import styles from './SliderPromo.module.scss';
import { Data } from '../../types/SliderPromo';

export const SliderPromo = () => {
  const [data, setData] = useState<Data[]>([]);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8000/static/slider')
      .then(data => setData(data.data.images))
      .catch(error => console.error(error));
  }, []);

  const transitions = useTransition(data[slide], {
    key: data[slide]?.id,
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
            src={item.url}
            alt={item.alt}
            style={{ ...style }}
            className={
              slide === +item.id
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
              slide === +data.id
                ? styles.indicators__indicator &&
                  styles.indicators__indicator_active
                : styles.indicators__indicator
            }
            onClick={() => setSlide(+data.id)}
          ></button>
        ))}
      </span>
    </div>
  );
};
