import React, { useState } from 'react';
import styles from './Dropdown.module.scss';

type Props = {
  list: string[][];
  currentItem: string;
  setOn: string;
  rootClassName?: string;
  onHandle: (setKey: string, value: string) => void;
};

const Dropdown: React.FC<Props> = ({
  list,
  currentItem,
  setOn,
  rootClassName,
  onHandle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(currentItem);

  return (
    <div
      className={`${styles.catalog__dropdown} ${styles.dropdown} ${
        rootClassName || ''
      }`}
    >
      <button
        className={styles.dropdown__button}
        onClick={() => setIsOpen((x) => !x)}
      >
        <span className={styles.dropdown__current}>{current}</span>
        <img
          src={process.env.PUBLIC_URL + '/img/icons/arrow.png'}
          className={`${isOpen ? styles.arrow__top : styles.arrow__bottom}`}
          alt="Arrow"
        />
      </button>
      {isOpen && (
        <ul className={styles.dropdown__list}>
          {list.map(([key, value]) => (
            <li
              className={styles.dropdown__item}
              key={key}
              onClick={() => {
                onHandle(setOn, key);
                setIsOpen(false);
                setCurrent(value);
              }}
            >
              {value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
