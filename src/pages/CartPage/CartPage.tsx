'use strict';

import { CartItem } from '../../components/CartItem';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.cart_info}>
        <a href="#" className={styles.link}>
          <img
            src={process.env.PUBLIC_URL + '/images/icons/arrow-left.png'}
            alt="Left arrow"
            className={styles.icon}
          />
          <span className={styles.text}>Back</span>
        </a>

        <h1 className={styles.title}>Cart</h1>
      </div>

      <div className={styles.cart_content}>
        <div className={styles.cards}>
          <CartItem />
          <CartItem />
          <CartItem />
        </div>

        <div className={styles.total_price}>
          <h2 className={styles.price}>$2657</h2>
          <p className={styles.price_text}>Total for 3 items</p>
          <a href="#" className={styles.checkout_button}>Checkout</a>
        </div>
      </div>
    </div>
  );
};
