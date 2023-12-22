'use strict';

import { useEffect, useState } from 'react';
import cn from 'classnames';
import { CartItem } from '../../components/CartItem';
import styles from './CartPage.module.scss';
import { ProductDetails } from '../../types/ProductDetails';
import { useAppSelector } from '../../store/hooks';
import { clearCart, selectCartProducts } from '../../store/cartSlice';
import axios from 'axios';
import { CartSkeletonLoader } from '../../components/CartSkeletonLoader';

import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../store/userSlice';

import { CheckoutModal } from '../../components/CheckoutModal';
import { useDispatch } from 'react-redux';
import { GoBackButton } from '../../components/GoBackButton';
import { SyncUserDataWithServer } from '../../utils/helpers/SyncUserDataWithServer';

export const CartPage = () => {
  const [products, setProducts] = useState<ProductDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const user = useAppSelector(selectUser);

  if (!user) {
    navigate('/login', { state: { from: '/cart' } });
  }

  const [isModalShown, setIsModalShown] = useState(false);
  const [isOrderSuccessful, setIsOrderSuccessful] = useState(true);
  const [isCheckoutDisabled, setIsCheckoutDisabled] = useState(false);

  const dispatch = useDispatch();
  const cartStorageList = useAppSelector(selectCartProducts);

  useEffect(() => {
    const getCart = async () => {
      try {
        const requests = cartStorageList.map((item) => {
          return axios.get<ProductDetails>(
            `https://fe-aug23-nohuggingonlydebugging-phone.onrender.com/${item.category}/${item.name}`,
          );
        });

        const responses = await Promise.all(requests);

        const updatedProducts = responses.map((res) => res.data);

        setProducts(updatedProducts);
      } catch (error) {
        console.error('Сталася помилка при отриманні даних:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getCart();
  }, [cartStorageList]);

  let totalSum = 0;
  products.forEach((product) => {
    const productInfo = cartStorageList.find(
      (item) => item.name === product.id,
    );

    if (productInfo) {
      totalSum += product.priceDiscount * productInfo.quantity;
    }
  });

  const productsCount = cartStorageList.reduce(
    (curr, next) => curr + next.quantity,
    0,
  );

  const removeProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleCheckoutButtonClick = () => {
    setIsCheckoutDisabled(true);

    fetch(
      'https://fe-aug23-nohuggingonlydebugging-phone.onrender.com/user/orders',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        credentials: 'include',
        body: JSON.stringify({ order: cartStorageList }),
      },
    )
      .catch(() => setIsOrderSuccessful(false))
      .finally(() => {
        setIsModalShown(true);

        setTimeout(handleCloseClick, 5000);
      });
  };

  const handleCloseClick = () => {
    setIsModalShown(false);
    setIsCheckoutDisabled(false);

    if (isOrderSuccessful) {
      const cart = JSON.stringify({
        cart: [],
      });

      SyncUserDataWithServer(cart, 'cart');
      dispatch(clearCart());
      setProducts([]);

      navigate('/');
    }
  };

  return (
    <>
      <div
        className={cn(styles.page, {
          [styles.page__empty]: (!products.length || isError) && !isLoading,
          [styles.page__modal_active]: isModalShown,
        })}
      >
        <div className={styles.cart_info}>
          <GoBackButton />

          <h1 className={styles.title}>Cart</h1>
        </div>

        {isLoading &&
          [1, 2, 3].map((item) => <CartSkeletonLoader key={item} />)}

        {isError && (
          <p className={styles.error_message}>
            An error occured while recieving data
          </p>
        )}

        {products.length > 0 && !isLoading && !isError && (
          <div className={styles.cart_content}>
            <div className={styles.cards}>
              {products.map((product) => (
                <CartItem
                  product={product}
                  removeProduct={removeProduct}
                  key={product.id}
                />
              ))}
            </div>

            <div className={styles.total_price}>
              <h2 className={styles.price}>{`$${totalSum}`}</h2>
              <p
                className={styles.price_text}
              >{`Total for ${productsCount} items`}</p>
              <button
                type="button"
                className={cn(styles.checkout_button, {
                  [styles.checkout_button__disabled]: isCheckoutDisabled,
                })}
                onClick={handleCheckoutButtonClick}
                disabled={isCheckoutDisabled}
              >
                Checkout
              </button>
            </div>
          </div>
        )}

        {!products.length && !isLoading && !isError && (
          <div className={styles.test}>
            <img
              src={process.env.PUBLIC_URL + '/img/icons/empty-cart.svg'}
              alt="Empty cart"
              className={styles.cart_icon}
            />
            <p className={styles.empty_cart_message}>Your cart is empty</p>
          </div>
        )}
      </div>
      {isModalShown && (
        <CheckoutModal
          success={isOrderSuccessful}
          handleCloseClick={handleCloseClick}
        />
      )}
    </>
  );
};
