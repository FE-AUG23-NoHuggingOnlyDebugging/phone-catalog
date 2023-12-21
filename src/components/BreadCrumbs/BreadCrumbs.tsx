import React from 'react';
import { useLocation } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { Link } from 'react-router-dom';
import styles from './BreadCrumbs.module.scss';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const breadcrumbs = useBreadcrumbs();

  const isHomePage = location.pathname === '/';
  const isCardPage = location.pathname === '/cart';

  if (isHomePage || isCardPage) {
    return null;
  }

  return (
    <div className={styles.crumbs}>
      <Link to="/" className={styles.crumbs__link}>
        <img
          className={`${styles.crumbs__icon} ${styles.dark_theme_icon_color}`}
          src={process.env.PUBLIC_URL + '/icons/home.png'}
          alt="Home"
        />
      </Link>
      <img
        className={`${styles.crumbs__icon} ${styles.dark_theme_crumbs__icon}`}
        src={process.env.PUBLIC_URL + '/icons/right-arrow.png'}
        alt="Right Arrow"
      />
      {breadcrumbs
        .slice(-2)
        .filter((elem) => elem.key !== '/catalog')
        .map(({ breadcrumb, match }, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <img
                className={`${styles.crumbs__icon} ${styles.dark_theme_crumbs__icon}`}
                src={process.env.PUBLIC_URL + '/icons/right-arrow.png'}
                alt="Right Arrow"
              />
            )}
            <Link
              className={`${styles.crumbs__link} ${styles.dark_theme_crumbs__link_hover}`}
              to={match.pathname}
            >
              {breadcrumb}
            </Link>
          </React.Fragment>
        ))}
    </div>
  );
};

export default Breadcrumbs;
