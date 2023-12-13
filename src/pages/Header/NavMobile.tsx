import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import cn from 'classnames';

const NavMobile = () => {
  const isActiveUtility = ({ isActive }: { isActive: boolean }) =>
    cn(styles.navbar__utilities, { [styles.navbar__highlight]: isActive });

  return (
    <nav className={`${styles.header__navbar} ${styles.navbar}`}>
      <div className={styles.navbar__right}>
        <Link to="/" className={styles.header__logo}>
          <img src={process.env.PUBLIC_URL + '/img/icon/logo.png'} alt="logo" />
        </Link>
      </div>

      <div className={styles.navbar__utility}>
        {/* <div className={styles.navbar__search}>
    <input
      type="text"
      className={styles.navbar__search_input}
      placeholder="Search in favourites..."
    />

    <img
      src={process.env.PUBLIC_URL + '/img/icon/search.png'}
      alt="search-icon"
      className={styles.navbar__search_icon}
    />
  </div> */}
        <NavLink to="/menu" className={isActiveUtility}>
          <img
            src={process.env.PUBLIC_URL + '/img/icon/burger-menu.png'}
            alt=""
          />
        </NavLink>
      </div>
    </nav>
  );
};

export default NavMobile;
