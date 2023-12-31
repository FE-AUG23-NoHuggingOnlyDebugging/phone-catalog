import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addUser, selectUser } from '../../store/userSlice';
import { replaceFavorites } from '../../store/favoriteSlice';
import { replaceCart } from '../../store/cartSlice';
import { loadUserCart } from '../../utils/helpers/loadUserCart';
import { loadUserFavorites } from '../../utils/helpers/loadUserFavorites';

export type User = {
  id: string;
  email: string;
  name: string;
};

const AuthPage = () => {
  const user = useAppSelector(selectUser);
  const dispatcher = useAppDispatch();

  useEffect(() => {
    const checkIfAuthorized = async () => {
      if (user) {
        return;
      }

      try {
        const response = await fetch(
          'https://phone-catalog-api-docker.onrender.com/auth/checkIfAuthorized',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
            },
            credentials: 'include',
          },
        );

        if (!response.ok) {
          return;
        }

        const userDataFromServer = await response.json();

        const favorutes = await loadUserFavorites();
        const cart = await loadUserCart();

        dispatcher(replaceCart(cart));
        dispatcher(replaceFavorites(favorutes));

        dispatcher(addUser(userDataFromServer));
      } catch (error) {
        console.log((error as Error).message);
      }
    };

    checkIfAuthorized();
  }, []);

  return <></>;
};

export default AuthPage;
