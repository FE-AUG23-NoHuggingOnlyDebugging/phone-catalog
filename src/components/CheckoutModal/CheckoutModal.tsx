/* eslint-disable react/prop-types */
import styles from './CheckoutModal.module.scss';

type Props = {
  success: boolean;
  handleCloseClick: () => void;
};

export const CheckoutModal:React.FC<Props> = ({ success, handleCloseClick }) => {
  return (
    <div className={styles.modal}>
      <header className={styles.modal_header}>
        <button
          type="button"
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
          {success
            ? 'We have received your order. Thank you for making a purchase!'
            : 'Failed to process the order. Something went wrong.'}
        </p>
      </div>
    </div>
  );
};
