import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addUser, removeUser, selectUser } from '../../store/userSlice';
import { clearFavorites, replaceFavorites } from '../../store/favoriteSlice';
import { clearCart, replaceCart } from '../../store/cartSlice';
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

  const signOut = async () => {
    try {
      await fetch(
        'https://fe-aug23-nohuggingonlydebugging-phone.onrender.com/auth/signOut',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
          credentials: 'include',
        },
      );

      dispatcher(removeUser());
      dispatcher(clearFavorites());
      dispatcher(clearCart());
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  useEffect(() => {
    const checkIfAuthorized = async () => {
      if (user) {
        return;
      }

      try {
        const response = await fetch(
          'https://fe-aug23-nohuggingonlydebugging-phone.onrender.com/auth/checkIfAuthorized',
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
        console.log(userDataFromServer);

        dispatcher(addUser(userDataFromServer));
      } catch (error) {
        console.log((error as Error).message);
        // setError(true);
      }
    };

    checkIfAuthorized();
  }, []);

  return (
    <>
      {user &&
      <button
        onClick={signOut}
        style={{
          position: 'absolute',
          top: '10px',
          left: '50%',
          display: 'block',
          color: 'red',
          height: '100px',
          width: '100px',
          marginInline: 'auto',
          transform: 'translateX(-50%)',
        }}
      >
        Logout
      </button>}
    </>
  );
};

export default AuthPage;
