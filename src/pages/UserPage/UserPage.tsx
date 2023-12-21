import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { clearCart } from '../../store/cartSlice';
import { clearFavorites } from '../../store/favoriteSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { removeUser, selectUser } from '../../store/userSlice';
import style from './UserPage.module.scss';
import { Orders } from '../../types/Orders';
import { GoBackButton } from '../../components/GoBackButton';

export const UserPage = () => {
  const user = useAppSelector(selectUser);
  const [orders, setOrders] = useState<Orders[] | null>(null);

  useEffect(() => {

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
          },
        );

        const newData = await data.json();
        setOrders(newData);
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
      <GoBackButton />
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

          <Link to='/' className={style.userPage__button} onClick={signOut}>
            Logout
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={style.userPage__door}
              width="25"
              height="25"
              viewBox="0 0 16 16"
            >
              {' '}
              <path
                d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"
              ></path>{' '}
              <path
                d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z"
              ></path>{' '}
            </svg>
          </Link>
        </div>
        <div className={style.userPage__orders}>
          {!orders?.length ? (
            <div className={style.userPage__dontHaveOrders}>
              <div className={style.userPage__smileBlock}>
                <svg xmlns="http://www.w3.org/2000/svg" className={style.userPage__smile} viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><circle
                  cx="128" cy="128" r="96"
                  fill="none" className={style.userPage__stroke} strokeLinecap="round"
                  strokeLinejoin="round" strokeWidth="12"/>
                <circle cx="92" cy="108" r="10"/><circle cx="164" cy="108" r="10"/><path
                  d="M169.6,176a48.1,48.1,0,0,0-83.2,0" fill="none" className={style.userPage__stroke}
                  strokeLinecap="round" strokeLinejoin="round" strokeWidth="12"/></svg>
              </div>

              <p className={style.userPage__noOrdersText}>You don&apos;t have any orders</p>
            </div>
          )
            : <div className={style.userPage__ordersBlock}>
              {orders?.map(order => {
                const orderData = new Date(order.createdAt).toString().split(' ').splice(0, 5).join(' ');

                return (
                  <div className={style.userPage__ordersByDate} key={order.id}>
                    <h2 className={style.userPage__dateTitle}>{orderData}</h2>

                    <div className={style.userPage__ordersDate}>
                      {order.products.map(productItem => (
                        <div key={productItem.imageUrl} className={style.userPage__productItem}>
                          <p className={style.userPage__productItem_counter}>
                            {`X${productItem.quantity}`}
                          </p>
                          <img className={style.userPage__productItem_image} src={productItem.imageUrl} alt="" />
                          <div>
                            <h3 className={style.userPage__productItem_title}>{productItem.title}</h3>
                            <p className={style.userPage__productItem_price}>{`${productItem.price}$`}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          }
        </div>
      </div>
    </section>
  );
};
