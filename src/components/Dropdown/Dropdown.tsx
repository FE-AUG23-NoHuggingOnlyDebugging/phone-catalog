import React, { useState } from 'react';
import styles from './Dropdown.module.scss';

type Props = {
  title: string;
  current: string | null;
  list: string[];
};

const Dropdown: React.FC<Props> = ({ title, current = null, list }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${styles.catalog__dropdown} ${styles.dropdown}`}>
      <p className={styles.dropdown__title}>{title}</p>
      <button
        className={styles.dropdown__button}
        onClick={() => setIsOpen((x) => !x)}
      >
        <span className={styles.dropdown__current}>{current || list[0]}</span>
        <img
          src={process.env.PUBLIC_URL + '/img/icon/arrow.svg'}
          className={styles.arrow__bottom}
          alt="Bottom Arrow"
        />
      </button>
      {isOpen && (
        <ul className={styles.dropdown__list}>
          {list.map((item: string) => (
            <li className={styles.dropdown__item} key={item}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
