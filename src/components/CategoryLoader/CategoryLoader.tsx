import styles from './categoryLoader.module.scss';

import React from 'react';
import cn from 'classnames';

type Props = {
  count: number
};

const CategoryLoader: React.FC<Props> = ({count}) => {
  return (
    <li className={styles.category_loader}>
      <div className={cn(styles.category_loader__bg, styles[`category_loader__bg_${count}`])}>
        <div className={styles.category_loader__spinner}>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className={styles.category_loader__info}>
        <span className={cn(styles.category_loader__title, styles.category_loader__box)} />
        <span className={cn(styles.category_loader__count, styles.category_loader__box)} />
      </div>
    </li>
  );
};

export default CategoryLoader;
