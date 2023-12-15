import React, { useState } from 'react';
import styles from './Dropdown.module.scss';

type Props = {
  list: string[][],
  setOn: string
  onHandle: (setKey: string, value: string) => void,
};

const Dropdown: React.FC<Props> = ({ list, setOn, onHandle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(list[0][1]);

  return (
    <div className={`${styles.catalog__dropdown} ${styles.dropdown}`}>
      <button
        className={styles.dropdown__button}
        onClick={() => setIsOpen((x) => !x)}
      >
        <span className={styles.dropdown__current}>{current}</span>
        <img
          src={process.env.PUBLIC_URL + `${isOpen ? '/img/icons/arrow-up.svg' : '/img/icons/arrow-down.svg'}`}
          className={styles.arrow__bottom}
          alt="Arrow"
        />
      </button>
      {isOpen && (
        <ul className={styles.dropdown__list}>
          {list.map(([key, value]) => (
            <li className={styles.dropdown__item} key={key} onClick={() => { onHandle(setOn, key); setIsOpen(false); setCurrent(value); }}>{value}</li>
          ))}
        </ul>)
      }
    </div >
  );
};

export default Dropdown;
