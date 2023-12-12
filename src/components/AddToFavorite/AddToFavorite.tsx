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
