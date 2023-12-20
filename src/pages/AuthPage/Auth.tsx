import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addUser, selectUser } from '../../store/userSlice';
import { replaceFavorites } from '../../store/favoriteSlice';
// import { replaceCart } from '../../store/cartSlice';

export type User = {
  id: string;
  email: string;
  name: string;
};

export const loadUserFavorites = async () => {
  try {
    const res = await fetch(
      'https://fe-aug23-nohuggingonlydebugging-phone.onrender.com/user/favorites',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        credentials: 'include',
      },
    );

    const data = await res.json();

    console.log(data);

    return data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const loadUserCart = async () => {
  try {
    const res = await fetch(
      'https://fe-aug23-nohuggingonlydebugging-phone.onrender.com/user/cart',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        credentials: 'include',
      },
    );

    const data = await res.json();

    console.log(data);

    return data;
  } catch (error) {
    console.log((error as Error).message);
  }
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
        // const cart = await loadUserCart();

        // dispatcher(replaceCart(cart));
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
      {/* <h1>User: {user ? user?.name : 'no user'}</h1>
      <form onSubmit={signIn}>
        <label htmlFor="email">Email</label>
        <input
          name="emal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="email">Name</label>
        <input
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="pass">Password</label>
        <input
          name="pass"
          type="text"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
      <button type="button" onClick={signOut}>
        Sign Out
      </button>
      <p style={{ color: 'red' }}>{error && 'Щось пішло не так'}</p> */}
    </>
  );
};

export default AuthPage;
