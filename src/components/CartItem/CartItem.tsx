'use strict';

import cn from 'classnames';
import styles from './CartItem.module.scss';

export const CartItem = () => {
  const count = 1;

  return (
    <>
      <article className={styles.card}>
        <div className={styles.first_part}>
          <a href="#">
            <img
              src={process.env.PUBLIC_URL + '/images/icons/close.png'}
              alt="Close"
              className={styles.icon}
            />
          </a>

          <img
            src={process.env.PUBLIC_URL + '/images/phone.png'}
            alt="phone photo"
          />

          <span className={styles.name}>
            Apple iPhone 14 Pro 128GB Silver (MQ023)
          </span>
        </div>

        <div className={styles.second_part}>
          <div className={styles.device_count}>
            <a href="#">
              <img
                src={process.env.PUBLIC_URL + '/images/icons/minus.png'}
                alt="minus"
                className={cn(`${styles.icon}`, {
                  [styles.icon__border]: count > 1,
                  [styles.icon_disabled]: count <= 1,
                })}
              />
            </a>

            <span className={styles.number}>{count}</span>

            <a href="#">
              <img
                src={process.env.PUBLIC_URL + '/images/icons/plus.png'}
                alt="plus"
                className={`${styles.icon} ${styles.icon__border}`}
              />
            </a>
          </div>

          <div className={styles.price}>
            <p className={styles.price_number}>
              $999
            </p>
          </div>
        </div>
      </article>
    </>
  );
};
