import { selectCartProducts } from '../../store/cartSlice';
import { useAppSelector } from '../../store/hooks';
// import { selectUser } from '../../store/userSlice';
import styles from './CartIcon.module.scss';

const CartIcon: React.FC = () => {
  const count = useAppSelector(selectCartProducts).reduce(
    (acc, el) => acc + el.quantity,
    0,
  );

  // const user = useAppSelector(selectUser);

  return (
    <div className={styles.cart_icon}>
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
    </div>
  );
};

export default CartIcon;
