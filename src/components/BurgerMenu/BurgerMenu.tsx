import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
// import styles from './BurgerMenu.module.scss';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`styles.burgerMenu ${isOpen ? 'open' : ''}`}>
      <div className="menu">
        <NavLink to="/" onClick={toggleMenu}>
          Home
        </NavLink>
        <NavLink to="/phones" onClick={toggleMenu}>
          Phones
        </NavLink>
        <NavLink to="/tablets" onClick={toggleMenu}>
          Tablets
        </NavLink>
        <NavLink to="/accessories" onClick={toggleMenu}>
          Accessories
        </NavLink>
      </div>
    </div>
  );
};

export default BurgerMenu;
