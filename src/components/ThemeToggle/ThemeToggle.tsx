import { useEffect, useState } from 'react';
import styles from './ThemeToggle.module.scss';

export const ThemeToggle = () => {
  const savedTheme = localStorage.getItem('theme') || 'light';

  const [theme, setTheme] = useState(savedTheme);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.getElementById('theme')?.setAttribute('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      return prevTheme === 'light' ? 'dark' : 'light';
    });
  };

  return (
    <>
      <label className={styles.dayNight}>
        <input
          type="checkbox"
          onChange={toggleTheme}
          checked={theme === 'light'}
        />
        <div></div>
      </label>
    </>
  );
};
