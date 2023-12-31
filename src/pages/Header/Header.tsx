import { useState, useEffect } from 'react';
import styles from './Header.module.scss';
import NavMobile from './NavMobile';
import NavDesktop from './NavDesktop';

const Header = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {};
  }, []);

  let componentToRender;

  if (windowWidth < 800) {
    componentToRender = <NavMobile />;
  } else {
    componentToRender = <NavDesktop />;
  }

  return <header className={styles.header}>{componentToRender}</header>;
};

export default Header;
