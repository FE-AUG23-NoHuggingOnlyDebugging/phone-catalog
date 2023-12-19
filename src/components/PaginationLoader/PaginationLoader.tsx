import styles from './PaginationLoader.module.scss';
import cn from 'classnames';

const PaginationLoader = () => (
  <div className={styles.loader}>
    <span className={cn(styles.control, styles.loader__box)} />
    <ul className={styles.pages}>
      <li className={cn(styles.page, styles.loader__box)} />
      <li className={cn(styles.page, styles.loader__box)} />
      <li className={cn(styles.page, styles.loader__box)} />
      <li className={cn(styles.page, styles.loader__box)} />
      <li className={cn(styles.page, styles.loader__box)} />
    </ul>
    <span className={cn(styles.control, styles.loader__box)} />
  </div>
);

export default PaginationLoader;

