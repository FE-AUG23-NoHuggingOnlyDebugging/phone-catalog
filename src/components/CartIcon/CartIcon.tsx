import React, { useState } from 'react';
import styles from './CartIcon.module.scss';

const CartIcon: React.FC = () => {
  const [cartCount, setCartCount] = useState<number>(3); //поки поставив 3 по замовчуванні

  const addToCart = () => {
    setCartCount((prevCount) => prevCount + 1);
  };

  return (
    <div className={styles.cart_icon} onClick={addToCart}>
      <img src={process.env.PUBLIC_URL + '/img/icons/cart.png'} alt="Cart" />
      {cartCount > 0 && <div className={styles.counter}>{cartCount}</div>}
    </div>
  );
};

export default CartIcon;
