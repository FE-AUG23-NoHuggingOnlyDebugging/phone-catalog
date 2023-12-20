import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import BurgerMenu from '../../components/BurgerMenu/BurgerMenu';

const NavMobile = () => {
  return (
    <nav className={`${styles.header__navbar} ${styles.navbar}`}>
      <div className={styles.navbar__right}>
        <Link to="/" className={styles.header__logo}>
          <img
            src={process.env.PUBLIC_URL + '/img/icons/logo.svg'}
            alt="logo"
          />
        </Link>
      </div>

      <div className={styles.navbar__utility}>
        <BurgerMenu />
      </div>
    </nav>
  );
};

export default NavMobile;
