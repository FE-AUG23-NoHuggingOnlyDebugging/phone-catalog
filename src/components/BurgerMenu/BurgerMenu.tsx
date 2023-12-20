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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              fillRule="evenodd"
              d="M12.4714 4.4714C12.7318 4.21105 12.7318 3.78894 12.4714 3.52859C12.2111 3.26824 11.789 3.26824 11.5286 3.52859L8.00004 7.05719L4.47145 3.52859C4.2111 3.26824 3.78899 3.26824 3.52864 3.52859C3.26829 3.78894 3.26829 4.21105 3.52864 4.4714L7.05723 7.99999L3.52864 11.5286C3.26829 11.7889 3.26829 12.211 3.52864 12.4714C3.78899 12.7317 4.2111 12.7317 4.47145 12.4714L8.00004 8.9428L11.5286 12.4714C11.789 12.7317 12.2111 12.7317 12.4714 12.4714C12.7318 12.211 12.7318 11.7889 12.4714 11.5286L8.94285 7.99999L12.4714 4.4714Z"
              fill="#313237"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
          >
            <path
              d="M0 1.5C0 1.08579 0.391751 0.75 0.875 0.75H13.125C13.6082 0.75 14 1.08579 14 1.5C14 1.91421 13.6082 2.25 13.125 2.25H0.875C0.391751 2.25 0 1.91421 0 1.5Z"
              fill="#313237"
            />
            <path
              d="M0 5C0 4.58579 0.391751 4.25 0.875 4.25H13.125C13.6082 4.25 14 4.58579 14 5C14 5.41421 13.6082 5.75 13.125 5.75H0.875C0.391751 5.75 0 5.41421 0 5Z"
              fill="#313237"
            />
            <path
              d="M0.875 7.75C0.391751 7.75 0 8.08579 0 8.5C0 8.91421 0.391751 9.25 0.875 9.25H13.125C13.6082 9.25 14 8.91421 14 8.5C14 8.08579 13.6082 7.75 13.125 7.75H0.875Z"
              fill="#313237"
            />
          </svg>
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
