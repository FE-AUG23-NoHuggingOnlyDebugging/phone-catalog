/* eslint-disable react/prop-types */
import styles from './CheckoutModal.module.scss';

type Props = {
  status: 'success' | 'failed' | 'registerRequired';
  handleCloseClick: () => void;
};

export const CheckoutModal: React.FC<Props> = ({
  status: success,
  handleCloseClick,
}) => {
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
          {success === 'success' &&
            'We have received your order. Thank you for making a purchase!'}
          {success === 'failed' &&
            'Failed to process the order. Something went wrong.'}
        </p>

        <p className={styles.modal_body_text}>
          To be able to add products to cart you should login first
        </p>
        <a href="#/login" className={styles.modal_body_link}>
          Sign in
        </a>
      </div>
    </div>
  );
};
