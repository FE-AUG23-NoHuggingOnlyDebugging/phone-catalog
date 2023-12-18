import { Link } from 'react-router-dom';
import { useState } from 'react';

import { FaUser, FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

import styles from './RegisterForm.module.scss';
import cn from 'classnames';
import axios from 'axios';

export const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const [hasNameError, setHasNameError] = useState(false);
  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasPassError, setHasPassError] = useState(false);

  const reset = () => {
    setName('');
    setEmail('');
    setPass('');
  };

  const passPattern = /^[^\W_]*$/;
  const namePattern = /^[A-Za-z]*$/;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !name ||
      !email ||
      !pass ||
      !namePattern.test(name) ||
      !passPattern.test(pass)
    ) {
      setHasNameError(!name || !namePattern.test(name));
      setHasEmailError(!email);
      setHasPassError(!pass || !passPattern.test(pass));
      return;
    }

    const userData = {
      name,
      email,
      password: pass,
    };

    await axios.post('http://localhost:5000/auth/signUp', userData);

    reset();
  };

  const errorMessages = (
    hasFieldRrror: boolean,
    pattern: RegExp,
    field: string,
    message: string,
    optionalMessage?: string,
  ) => {
    if (hasFieldRrror && !pattern.test(field)) {
      return (
        <p className={styles.error_message}>
          Incorrect {message}, use only a-z or A-Z {optionalMessage}
        </p>
      );
    } else if (hasFieldRrror) {
      return <p className={styles.error_message}>Please enter {message}</p>;
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.form__title}>Create Account</h1>

      <div className={styles.login_box}>
        <input
          className={cn(styles.login_box__field, {
            [styles.login_box__field_error]: hasNameError,
          })}
          type="text"
          placeholder="enter your name"
          autoComplete="on"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setHasNameError(false);
          }}
        />
        <FaUser
          className={cn(styles.login_box__icon, {
            [styles.login_box__icon_error]: hasNameError,
          })}
        />
      </div>

      {errorMessages(hasNameError, namePattern, name, 'name')}

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

      {errorMessages(
        hasPassError,
        passPattern,
        pass,
        'password',
        'and numbers',
      )}

      <button type="submit" className={styles.btn}>
        Сreate
      </button>

      <div className={styles.register_field}>
        <p>
          Have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </form>
  );
};
