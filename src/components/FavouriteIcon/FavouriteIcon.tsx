import styles from './FavouriteIcon.module.scss';
import { useAppSelector } from '../../store/hooks';
import { selectFavoritesProducts } from '../../store/favoriteSlice';
import cn from 'classnames';

const FavouriteIcon: React.FC = () => {
  const elements = useAppSelector(selectFavoritesProducts);

  return (
    <div className={styles.favourite_icon}>
      <img
        className={cn(styles.dark_theme_icon_color, styles.icon_color)}
        src={process.env.PUBLIC_URL + '/img/icons/favourites.svg'}
        alt="Favourites"
      />
      {elements.length > 0 && (
        <div className={styles.circle}>
          <span className={styles.counter}>{elements.length}</span>
        </div>
      )}
    </div>
  );
};

export default FavouriteIcon;
