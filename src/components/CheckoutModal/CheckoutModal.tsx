/* eslint-disable react/prop-types */
import styles from './CheckoutModal.module.scss';

type Props = {
  handleCloseClick: () => void;
};

export const CheckoutModal:React.FC<Props> = ({ handleCloseClick }) => {
  return (
    <div className={styles.modal}>
      <header className={styles.modal_header}>
        <button
          type='button'
          className={styles.modal_header_button}
          onClick={handleCloseClick}
        >
          <img
            src={process.env.PUBLIC_URL + '/img/icons/close.png'}
            alt="Close"
            className={styles.modal_close_icon}
          />
        </button>
      </header>

      <div className={styles.modal_body}>
        <p className={styles.modal_body_text}>
          We have received your order. Thank you for making a purchase!
        </p>
      </div>
    </div>
  );
};
