// src/components/ThemeSwitcher.js
import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitcher = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button style={{float:'right'}}
      // className={`${styles.button} ${isDarkMode ? styles.darkMode : styles.lightMode}`}
      onClick={toggleTheme}
    >
      Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
    </button>
  );
};

export default ThemeSwitcher;
