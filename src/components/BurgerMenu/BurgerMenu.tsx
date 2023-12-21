import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import styles from './BurgerMenu.module.scss';
import CartIcon from '../CartIcon/CartIcon';
import FavouriteIcon from '../FavouriteIcon/FavouriteIcon';
import { useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/userSlice';
import disableScroll from 'disable-scroll';

const isActiveLink = ({ isActive }: { isActive: boolean }) =>
  cn(styles.navbar__item, { [styles.navbar__highlight]: isActive });

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAppSelector(selectUser);

  const toggleMenu = () => {
    setIsOpen(!isOpen);

    if (isOpen) {
      disableScroll.off();
    } else {
      disableScroll.on();
    }
  };

  return (
    <>
      <button onClick={toggleMenu} className={styles.burger_button}>
        {isOpen ? (
          <img
            className={styles.burger_button_icon}
            src={process.env.PUBLIC_URL + '/img/icons/burger_menu_close.png'}
            alt="burger-menu-icon"
          />
        ) : (
          <img
            className={styles.burger_button_icon}
            src={process.env.PUBLIC_URL + '/img/icons/burger_menu.png'}
            alt="burger-menu-icon"
          />
        )}
      </button>
      <div className={styles.burger_menu}>
        {isOpen && (
          <div className={styles.menu_items}>
            <nav className={`${styles.header__navbar} ${styles.navbar}`}>
              <div className={styles.navbar__top}>
                <div className={styles.navbar__link}>
                  <NavLink to="/" className={isActiveLink} onClick={toggleMenu}>
                    Home
                  </NavLink>

                  <NavLink
                    to="/catalog/phones"
                    className={isActiveLink}
                    onClick={toggleMenu}
                  >
                    Phones
                  </NavLink>

                  <NavLink
                    to="/catalog/tablets"
                    className={isActiveLink}
                    onClick={toggleMenu}
                  >
                    Tablets
                  </NavLink>

                  <NavLink
                    to="/catalog/accessories"
                    className={isActiveLink}
                    onClick={toggleMenu}
                  >
                    Accessories
                  </NavLink>

                  <NavLink
                    to={user ? '/user' : '/login'}
                    className={isActiveLink}
                    onClick={toggleMenu}
                  >
                    {user ? 'User Profile' : 'Login'}
                  </NavLink>
                </div>
              </div>
            </nav>
            <div className={styles.navbar__bottom}>
              <div className={styles.navbar__bottom_block}>
                <NavLink to="/favourites" onClick={toggleMenu}>
                  <FavouriteIcon />
                </NavLink>
              </div>
              <div className={styles.navbar__bottom_block}>
                <NavLink to={user ? '/cart' : '/login'} onClick={toggleMenu}>
                  <CartIcon />
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default BurgerMenu;
