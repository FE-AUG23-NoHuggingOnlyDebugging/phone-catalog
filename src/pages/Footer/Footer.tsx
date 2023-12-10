'use strict';

import { useAppSelector } from '../../store/hooks';
import { selectFavoritesCount } from '../../store/favoriteSlice';

import styles from './Footer.module.scss';

export const Footer = () => {
  const count = useAppSelector(selectFavoritesCount);

  return (
    <>
      <h1 className={styles.footer}>Footer</h1>
      <span>Favorites count:</span>
      <span>{count}</span>
    </>
  );
};
