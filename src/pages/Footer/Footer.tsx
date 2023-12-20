'use strict';

import styles from './Footer.module.scss';

import { Link } from 'react-router-dom';

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.footer__left}>
      <img
        className={`${styles.footer__left} ${styles.dark_theme_logo_color}`}
        src={process.env.PUBLIC_URL + '/img/icons/new_logo.svg'}
        alt="logo"
      />
      <div className={styles.footer__logo_hand}>
        <img
          src={process.env.PUBLIC_URL + '/img/icons/hand_logo.svg'}
          alt="logo"
        />
      </div>
    </div>
    <nav className={styles.footer__center}>
      <ul className={styles.footer__ul}>
        <li className={styles.footer__li}>
          <Link
            to="https://github.com/FE-AUG23-NoHuggingOnlyDebugging"
            className={styles.footer__link}
          >
            Github
          </Link>
        </li>

        <li className={styles.footer__li}>
          <Link to="/contacts" className={styles.footer__link}>
            Contacts
          </Link>
        </li>

        <li className={styles.footer__li}>
          <Link to="/rights" className={styles.footer__link}>
            Rights
          </Link>
        </li>
      </ul>
    </nav>

    <div className={styles.footer__right}>
      <p className={styles.footer__text}>Back to top</p>
      <button className={styles.footer__action_up} type="button">
        <img
          src={process.env.PUBLIC_URL + '/img/icons/arrow.png'}
          alt="Button Up"
          className={`${styles.footer__arrow} ${styles.dark_theme_icon_color}`}
          onClick={scrollToTop}
        />
      </button>
    </div>
  </footer>
);

export default Footer;
