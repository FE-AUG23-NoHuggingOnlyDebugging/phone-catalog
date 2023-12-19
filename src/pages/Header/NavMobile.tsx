import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

const NavMobile = () => {

  return (
    <nav className={`${styles.header__navbar} ${styles.navbar}`}>
      <div className={styles.navbar__right}>
        <Link to="/" className={styles.header__logo}>
          <img
            src={process.env.PUBLIC_URL + '/img/icons/logo.png'}
            alt="logo"
          />
        </Link>
      </div>

      <div className={styles.navbar__utility}>
        <a href="/menu">
          <img
            src={process.env.PUBLIC_URL + '/img/icons/burger-menu.png'}
            alt=""
          />
        </a>
      </div>
    </nav>
  );
};

export default NavMobile;
