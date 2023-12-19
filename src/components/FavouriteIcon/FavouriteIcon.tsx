import React, { useState } from 'react';
import styles from './FavouriteIcon.module.scss';

const FavouriteIcon: React.FC = () => {
  const [FavouriteCount, setFavouriteCount] = useState<number>(10); //поки поставив 10 по замовчуванні

  const addToFavourite = () => {
    setFavouriteCount((prevCount) => prevCount + 1);
  };

  return (
    <div className={styles.favourite_icon} onClick={addToFavourite}>
      <img src={process.env.PUBLIC_URL + '/img/icons/favourites.png'} alt="Favourites" />
      {FavouriteCount > 0 && <div className={styles.counter}>{FavouriteCount}</div>}
    </div>
  );
};

export default FavouriteIcon;
