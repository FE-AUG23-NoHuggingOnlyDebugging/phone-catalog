import { useState } from 'react';
import { Link } from 'react-router-dom';

import { FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

import { Modal } from '../Modal/Modal';

import axios from 'axios';

import styles from './LoginForm.module.scss';
import cn from 'classnames';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasPassError, setHasPassError] = useState(false);

  const [isModal, setIsModal] = useState(false);

  const pattern = /^[^\W_]*$/;

  const reset = () => {
    setEmail('');
    setPass('');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !pass || !pattern.test(pass)) {
      setHasEmailError(!email);
      setHasPassError(!pass || !pattern.test(pass));
      return;
    }

    const userData = {
      email,
      password: pass,
    };

    await axios.post('http://localhost:5000/auth/signIn', userData);

    reset();
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
        <label>
          <input type="checkbox" />
          Remember me
        </label>
        <p onClick={() => setIsModal(true)}>Forgot password</p>
      </div>

      <button type="submit" className={styles.btn}>
        Login
      </button>

      <div className={styles.register_field}>
        <p>
          {'Don\'t have an account?'}
          <Link to="/register">Sign Up</Link>
        </p>
      </div>

      {isModal && (
        <div className={styles.modal_background}>
          <Modal setIsModal={setIsModal} />
        </div>
      )}
    </form>
  );
};
