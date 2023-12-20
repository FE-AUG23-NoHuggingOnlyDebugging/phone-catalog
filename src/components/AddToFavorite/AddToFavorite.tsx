import styles from './AddToFavorite.module.scss';
import React from 'react';
import {
  addToFavorites,
  removeFromFavorites,
  selectFavoritesProducts,
} from '../../store/favoriteSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { SyncUserDataWithServer } from '../../utils/helpers/SyncUserDataWithServer';

type Props = {
  added?: boolean;
  id: string;
};

const AddToFavorite: React.FC<Props> = ({ added = false, id }) => {
  const dispatcher = useAppDispatch();
  const favoritesInBrowser = useAppSelector(selectFavoritesProducts);

  const handleClickAdd = () => {
    dispatcher(addToFavorites(id));
    const favorites = JSON.stringify({
      favorite: [...favoritesInBrowser, id],
    });
    SyncUserDataWithServer(favorites, 'favorites');
  };

  const handleClickRemove = () => {
    dispatcher(removeFromFavorites(id));
    const favorites = JSON.stringify({
      favorite: favoritesInBrowser.filter(elem => elem !== id),
    });
    SyncUserDataWithServer(favorites, 'favorites');
  };

  return (
    <button
      className={added ? `${styles.add_to_favorite} ${styles.bg_added}` : styles.add_to_favorite}
      type="button"
      onClick={added ? handleClickRemove : handleClickAdd}
    >
      {added ? (
        <img
          src={process.env.PUBLIC_URL + '/img/icons/favourites_added.png'}
          alt={'added to favourites'}
        />
      ) : (
        <img
          className={styles.dark_theme_icon_color}
          src={process.env.PUBLIC_URL + '/img/icons/favourites.png'}
          alt={'add to favourites'}
        />
      )
      }
    </button>
  );
};

export default AddToFavorite;
