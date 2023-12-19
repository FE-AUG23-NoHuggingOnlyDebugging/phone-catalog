import { useState, useEffect } from 'react';
import styles from './Header.module.scss';
import NavMobile from './NavMobile';
import NavDesktop from './NavDesktop';

const Header = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {};
  }, []);

  let componentToRender;

  if (windowWidth < 640) {
    componentToRender = <NavMobile />;
  } else {
    componentToRender = <NavDesktop />;
  }

  return <header className={styles.header}>{componentToRender}</header>;
};

export default Header;
