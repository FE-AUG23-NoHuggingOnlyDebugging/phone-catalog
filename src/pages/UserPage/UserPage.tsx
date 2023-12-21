import { useEffect } from 'react';
import { clearCart } from '../../store/cartSlice';
import { clearFavorites } from '../../store/favoriteSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { removeUser, selectUser } from '../../store/userSlice';
import style from './UserPage.module.scss';

export const UserPage = () => {
  const user = useAppSelector(selectUser);
  //const [orders, setOrders] = useState(null);

  console.log(user);

  useEffect(() => {
    console.log('dadada');

    const getData = async () => {
      try {
        const data = await fetch(
          'https://fe-aug23-nohuggingonlydebugging-phone.onrender.com/user/orders',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
            },
            credentials: 'include',
          });

        const newData = await data.json();

        console.log(newData);
      } catch (e) {
        console.log(e);
      }
    };

    getData();

  }, []);

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

  return (
    <section className={style.userPage}>
      <h1 className={style.userPage__title}>User Profile</h1>
      <div className={style.userPage__main}>
        <div className={style.userPage__userInfo}>
          <div>
            <p className={style.userPage__subTitle}>Your Name</p>
            <p className={style.userPage__value}>{user?.name}</p>
          </div>
          <div>
            <p className={style.userPage__subTitle}>Email Address</p>
            <p className={style.userPage__value}>{user?.email}</p>
          </div>

          <button
            className={style.userPage__button}
            onClick={signOut}
          >
            Logout
            <svg
              style={{color: 'white'}} xmlns="http://www.w3.org/2000/svg" width="25"
              height="25" fill="currentColor" viewBox="0 0 16 16"> <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" fill="white"></path> <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z" fill="white"></path> </svg>
          </button>
        </div>
        <div className={style.userPage__orders}>
        </div>
      </div>
    </section>
  );
};
