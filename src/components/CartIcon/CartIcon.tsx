import { selectCartProducts } from '../../store/cartSlice';
import { useAppSelector } from '../../store/hooks';
import styles from './CartIcon.module.scss';

const CartIcon: React.FC = () => {
  const count = useAppSelector(selectCartProducts).reduce(
    (acc, el) => acc + el.quantity,
    0,
  );

  return (
    <div className={styles.cart_icon}>
      {/* <!-- <<<<<<< light-dark-theme
      <img
        className={styles.dark_theme_icon_color}
        src={process.env.PUBLIC_URL + '/img/icons/cart.svg'}
        alt="Cart"
      />
<!--       {count > 0 && <div className={styles.counter}>{count}</div>} -->
======= --> */}
      <img
        src={process.env.PUBLIC_URL + '/img/icons/cart.svg'}
        className={styles.dark_theme_icon_color}
        alt="Cart"
      />
      {count > 0 && (
        <div className={styles.circle}>
          <span className={styles.counter}>{count}</span>
        </div>
      )}
      {/* <!-- >>>>>>> main --> */}
    </div>
  );
};

export default CartIcon;
