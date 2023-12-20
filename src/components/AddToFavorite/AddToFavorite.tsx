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
      className={styles.add_to_favorite}
      type="button"
      onClick={added ? handleClickRemove : handleClickAdd}
    >
      <img
        src={
          process.env.PUBLIC_URL +
          (added
            ? '/img/icons/favourites_added.png'
            : '/img/icons/favourites.png')
        }
        alt={added ? 'added to favourites' : 'add to favourites'}
      />
    </button>
  );
};

export default AddToFavorite;
