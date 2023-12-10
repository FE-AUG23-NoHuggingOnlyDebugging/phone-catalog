'use strict';

import {
  useAppDispatch, //for instance,
  useAppSelector,
} from '../../store/hooks';
import {
  addToFavorites,
  selectFavoritesCount,
  // selectFavoritesGoods, //for instance,
  // addToFavorites, //for instance, function to act with store (and local store in this case)
  // removeFromFavorites, //for instance, function to act with store (and local store in this case)
} from '../../store/favoriteSlice';

import styles from './Header.module.scss';
import { SupperButton } from '../../components/SupperButton';

export const Header = () => {
  const count = useAppSelector(selectFavoritesCount);
  //const favoriteGoods = useAppSelector(selectFavoritesGoods); //for instance
  const dispatch = useAppDispatch(); //for instance, how to import reducers ''trigger''

  return (
    <div className={styles.header}>
      <h1 className={styles.header__title}>Header</h1>
      <span>Favorites count:</span>
      <span>{count}</span>
      <button
        onClick={() =>
          dispatch(
            addToFavorites({
              id: '1',
              category: 'phones',
              phoneId: 'apple-iphone-7-32gb-black',
              itemId: 'apple-iphone-7-32gb-black',
              name: 'Apple iPhone 7 32GB Black',
              fullPrice: 400,
              price: 375,
              screen: '4.7 IPS',
              capacity: '32GB',
              color: 'black',
              ram: '2GB',
              year: 2016,
              image: 'img/phones/apple-iphone-7/black/00.jpg',
            }),
          )
        }
      >
        addGoods
      </button>
      {process.env.BASE_URL}
      <SupperButton />
    </div>
  );
};
