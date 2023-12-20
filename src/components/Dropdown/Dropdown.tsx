import React, { useState, useRef, useEffect } from 'react';
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

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <div
      ref={ref}
      className={`${styles.catalog__dropdown} ${styles.dropdown} ${
        rootClassName || ''
      }`}
    >
      <button
        className={styles.dropdown__button}
        onClick={() => setIsOpen((x) => !x)}
      >
        <span className={styles.dropdown__current}>{currentItem}</span>
        <img
          src={process.env.PUBLIC_URL + '/img/icons/arrow.png'}
          className={`${isOpen ? styles.arrow__top : styles.arrow__bottom} ${styles.dark_theme_icon_color}`}
          alt="Arrow"
        />
      </button>
      {isOpen && (
        <ul className={styles.dropdown__list}>
          {list.map(([key, value]) => (
            <li
              className={`${
                value === currentItem
                  ? styles.dropdown__item_current
                  : styles.dropdown__item
              }`}
              key={key}
              onClick={() => {
                if (value === currentItem) {
                  return;
                }
                onHandle(setOn, key);
                setIsOpen(false);
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
