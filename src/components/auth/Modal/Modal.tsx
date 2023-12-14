import PropTypes from 'prop-types';
import styles from './Modal.module.scss';

type Props = {
  setIsModal: (value: boolean) => void,
};

export const Modal: React.FC<Props> = ({ setIsModal }) => {
  return (
    <div className={styles.container}>
      <div className={styles.modal_window}>

        <button
          className={styles.close_btn}
          onClick={() => setIsModal(false)}
        >
          x
        </button>

        <h1 className={styles.modal_window__title}>Password Update</h1>

        <div className={styles.modal_window__info}>
          <p>
            Your password request is complete. Check your email for the new password.
          </p>
        </div>

        <div className={styles.accept_box}>
          <button
            className={styles.accept_box__btn}
            onClick={() => setIsModal(false)}
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  setIsModal: PropTypes.func.isRequired,
};
