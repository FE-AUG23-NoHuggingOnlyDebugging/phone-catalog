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
      <img
        className={styles.dark_theme_icon_color}
        src={process.env.PUBLIC_URL + '/img/icons/cart.svg'}
        alt="Cart"
      />
      {count > 0 && <div className={styles.counter}>{count}</div>}
    </div>
  );
};

export default CartIcon;
