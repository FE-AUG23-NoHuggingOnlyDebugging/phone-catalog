'use strict';

import styles from './Footer.module.scss';

import { Link } from 'react-router-dom';

const scrollToTop = () =>{
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.footer__left}>
      <img
        src={process.env.PUBLIC_URL + '/img/icon/logo-desktop.png'}
        alt="logo"
        className={styles.footer__logo}
      />
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
          <Link
            to="/contacts"
            className={styles.footer__link}
          >
          Contacts
          </Link>
        </li>

        <li className={styles.footer__li}>
          <Link
            to="/rights"
            className={styles.footer__link}
          >
          Rights
          </Link>
        </li>
      </ul>
    </nav>

    <div className={styles.footer__right}>
      <p className={styles.footer__text}>Back to top</p>
      <button className={styles.footer__action_up} type="button">
        <img
          src={process.env.PUBLIC_URL + '/img/icon/arrow.png'}
          alt="Button Up"
          className={styles.footer__arrow}
          onClick = {scrollToTop}
        />
      </button>
    </div>
  </footer>
);

export default Footer;
