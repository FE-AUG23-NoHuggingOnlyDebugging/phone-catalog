import styles from './AddToFavorite.module.scss';
import React from 'react';
import { addToFavorites, removeFromFavorites } from '../../store/favoriteSlice';
import { useDispatch } from 'react-redux';

type Props = {
  added?: boolean;
  id: string;
};

const AddToFavorite: React.FC<Props> = ({ added = false, id }) => {
  const dispatch = useDispatch();

  const handleClickAdd = () => {
    dispatch(addToFavorites(id));
  };

  const handleClickRemove = () => {
    dispatch(removeFromFavorites(id));
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
