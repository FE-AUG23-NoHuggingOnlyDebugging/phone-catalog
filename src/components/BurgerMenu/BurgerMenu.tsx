import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import styles from './BurgerMenu.module.scss';
import CartIcon from '../CartIcon/CartIcon';
import FavouriteIcon from '../FavouriteIcon/FavouriteIcon';

const isActiveLink = ({ isActive }: { isActive: boolean }) =>
  cn(styles.navbar__item, { [styles.navbar__highlight]: isActive });

const isActiveUtility = ({ isActive }: { isActive: boolean }) =>
  cn(styles.navbar__utilities, { [styles.navbar__highlight]: isActive });

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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

              <div className={styles.navbar__bottom}>
                <NavLink to="/favourites" className={isActiveUtility}>
                  <FavouriteIcon />
                </NavLink>

                <NavLink to="/cart" className={isActiveUtility}>
                  <CartIcon />
                </NavLink>
              </div>
            </nav>
          </div>
        )}
      </div>
    </>
  );
};
export default BurgerMenu;
