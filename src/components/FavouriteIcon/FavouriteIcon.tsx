import styles from './FavouriteIcon.module.scss';
import { useAppSelector } from '../../store/hooks';
import { selectFavoritesProducts } from '../../store/favoriteSlice';

const FavouriteIcon: React.FC = () => {
  const elements = useAppSelector(selectFavoritesProducts);

  return (
    <div className={styles.favourite_icon}>
      <img
        src={process.env.PUBLIC_URL + '/img/icons/favourites.png'}
        alt="Favourites"
      />
      {elements.length > 0 && (
        <div className={styles.counter}>{elements.length}</div>
      )}
    </div>
  );
};

export default FavouriteIcon;
