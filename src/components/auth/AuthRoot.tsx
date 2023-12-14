import { useLocation } from 'react-router-dom';
import { LoginForm } from './LoginForm/LoginForm';
import { RegisterForm } from './RegisterForm/RegisterForm';
import styles from './AuthRoot.module.scss';

export const AuthRoot = () => {
  const location = useLocation();

  return (
    <>
      <div className={styles.container}>
        {
          location.pathname === '/login' ?
            <LoginForm /> :
            location.pathname === '/register' ?
              <RegisterForm /> : null
        }
      </div>
    </>
  );
};
