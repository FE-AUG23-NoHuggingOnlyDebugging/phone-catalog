import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import BurgerMenu from '../../components/BurgerMenu/BurgerMenu';
import { Switch } from '../../components/Switch/Switch';

const NavMobile = () => {
  return (
    <nav className={`${styles.header__navbar} ${styles.navbar}`}>
      <div className={styles.navbar__right}>
        <Link to="/" className={styles.header__logo}>
          <img
            className={styles.dark_theme_logo_color}
            src={process.env.PUBLIC_URL + '/img/icons/new_logo.svg'}
            alt="logo"
          />
          <div className={styles.header__logo_hand}>
            <img
              src={process.env.PUBLIC_URL + '/img/icons/hand_logo.svg'}
              alt="logo"
            />
          </div>
        </Link>
      </div>

      <div className={styles.navbar__utility}>
        <div className={styles.switch}>
          <Switch />
        </div>

        <BurgerMenu />
      </div>
    </nav>
  );
};

export default NavMobile;
