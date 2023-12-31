import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

import { Modal } from '../Modal/Modal';

import styles from './LoginForm.module.scss';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addUser, selectUser } from '../../../store/userSlice';
import { addFavoritesFromDb } from '../../../store/favoriteSlice';
import { replaceCart } from '../../../store/cartSlice';
import { loadUserFavorites } from '../../../utils/helpers/loadUserFavorites';
import { loadUserCart } from '../../../utils/helpers/loadUserCart';
import { usePageError } from '../../../hooks/usePageError';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [isLoading, setIsloading] = useState(false);

  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasPassError, setHasPassError] = useState(false);

  const [isModal, setIsModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatcher = useAppDispatch();
  const [error, setError] = usePageError(null);

  const user = useAppSelector(selectUser);

  if (user) {
    navigate(location.state?.from || '/');
  }

  const pattern = /^[^\W_]*$/;

  const reset = () => {
    setEmail('');
    setPass('');
  };

  const handleSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !pass || !pattern.test(pass)) {
      setHasEmailError(!email);
      setHasPassError(!pass || !pattern.test(pass));
      return;
    }

    setError(null);
    setIsloading(true);
    try {
      const response = await fetch(
        'https://phone-catalog-api-docker.onrender.com/auth/signIn',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
          credentials: 'include',
          body: JSON.stringify({
            email,
            password: pass,
          }),
        },
      );

      if (response.status >= 400) {
        setError(await response.json());

        return;
      }

      const userDataFromServer = await response.json();

      const data = await loadUserFavorites();
      const cart = await loadUserCart();

      dispatcher(addUser(userDataFromServer));

      dispatcher(replaceCart(cart));

      dispatcher(addFavoritesFromDb(data));
      reset();

      navigate('/');
    } catch (error) {
      console.log((error as Error).message);
    } finally {
      setIsloading(false);
    }
  };

  const passErrorMessages = () => {
    if (hasPassError && !pattern.test(pass)) {
      return (
        <p className={styles.error_message}>
          Incorrect password, use only a-z or A-Z and numbers
        </p>
      );
    } else if (hasPassError) {
      return <p className={styles.error_message}>Please enter password</p>;
    }
  };

  return (
    <>
      <h2>{user && `Hello ${user.name}`}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.form__title}>Login</h1>

        <div className={styles.login_box}>
          <input
            className={cn(styles.login_box__field, {
              [styles.login_box__field_error]: hasEmailError,
            })}
            type="email"
            placeholder="enter your email"
            autoComplete="on"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setHasEmailError(false);
            }}
          />
          <MdEmail
            className={cn(styles.login_box__icon, {
              [styles.login_box__icon_error]: hasEmailError,
            })}
          />
        </div>

        {hasEmailError && (
          <p className={styles.error_message}>Please enter email</p>
        )}

        <div className={styles.login_box}>
          <input
            className={cn(styles.login_box__field, {
              [styles.login_box__field_error]: hasPassError,
            })}
            type="password"
            placeholder="enter your password"
            autoComplete="on"
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
              setHasPassError(false);
            }}
          />
          <FaLock
            className={cn(styles.login_box__icon, {
              [styles.login_box__icon_error]: hasPassError,
            })}
          />
        </div>

        {passErrorMessages()}

        <div className={styles.additional_options}>
          {/* <label>
            <input type="checkbox" />
            Remember me
          </label> */}
          <p onClick={() => setIsModal(true)}>Forgot password</p>
        </div>

        <button type="submit" className={styles.btn}>
          Login
        </button>

        <div className={styles.register_field}>
          <p>
            {'Don\'t have an account? '}
            <Link to="/register">Sign Up</Link>
          </p>
        </div>

        {isModal && (
          <div className={styles.modal_background}>
            <Modal setIsModal={setIsModal} />
          </div>
        )}
        <p style={{ color: 'red', textAlign: 'center' }}>{error?.error}</p>

        <p style={{ color: 'green', textAlign: 'center' }}>
          {isLoading && 'Sending...'}
        </p>
      </form>
    </>
  );
};
