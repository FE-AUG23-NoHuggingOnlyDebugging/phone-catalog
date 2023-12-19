import cn from 'classnames';
import styles from './GoBackButton.module.scss';

export const GoBackButton = () => {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={() => window.history.back()}
    >
      <img
        src={process.env.PUBLIC_URL + '/img/icons/arrow.png'}
        alt="left arrow"
        className={cn(styles.icon, styles.arrow__left)}
      />
      <span className={styles.text}>Back</span>
    </button>
  );
};
