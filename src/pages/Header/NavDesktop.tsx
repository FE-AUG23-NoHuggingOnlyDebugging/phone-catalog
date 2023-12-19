import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import cn from 'classnames';
import CartIcon from '../../components/CartIcon/CartIcon';
import FavouriteIcon from '../../components/FavouriteIcon/FavouriteIcon';

const NavDesktop = () => {
  const isActiveLink = ({ isActive }: { isActive: boolean }) =>
    cn(styles.navbar__item, { [styles.navbar__highlight]: isActive });

  const isActiveUtility = ({ isActive }: { isActive: boolean }) =>
    cn(styles.navbar__utilities, { [styles.navbar__highlight]: isActive });

  return (
    <nav className={`${styles.header__navbar} ${styles.navbar}`}>
      <div className={styles.navbar__right}>
        <Link to="/" className={styles.header__logo}>
          <img
            src={process.env.PUBLIC_URL + '/img/icons/logo-desktop.png'}
            alt="logo"
          />
        </Link>

        <div className={styles.navbar__link}>
          <NavLink to="/" className={isActiveLink}>
            Home
          </NavLink>

          <NavLink to="/catalog/phones" className={isActiveLink}>
            Phones
          </NavLink>

          <NavLink to="/catalog/tablets" className={isActiveLink}>
            Tablets
          </NavLink>

          <NavLink to="/catalog/accessories" className={isActiveLink}>
            Accessories
          </NavLink>
        </div>
      </div>

      <div className={styles.navbar__utility}>
        {/* <div className={styles.navbar__search}>
    <input
      type="text"
      className={styles.navbar__search_input}
      placeholder="Search in favourites..."
    />

    <img
      src={process.env.PUBLIC_URL + '/img/icons/search.png'}
      alt="search-icon"
      className={styles.navbar__search_icon}
    />
  </div> */}
        <NavLink to="/favourites" className={isActiveUtility}>
          <FavouriteIcon/>
        </NavLink>

        <NavLink to="/cart" className={isActiveUtility}>
          <CartIcon />
        </NavLink>
      </div>
    </nav>
  );
};

export default NavDesktop;
