import React, { useState, useEffect } from 'react';
import TarotSpread from '../../components/TarotSpread';
import tarotData from '../../tarot-images.json';
import styles from './index.module.css';

export default function Home() {
  const spreadSize = 3; // Change this number to the desired spread size
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkModeChange = (newDarkMode) => {
    setDarkMode(newDarkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add(styles.darkMode);
    } else {
      document.body.classList.remove(styles.darkMode);
    }

    return () => {
      document.body.classList.remove(styles.darkMode);
    };
  }, [darkMode]);

  return (
    <div>
      <h1 className={styles.title}>Psychic GPT</h1>
      <div className={styles.tarotSpreadContainer}>
        <TarotSpread cards={tarotData.cards} spreadSize={3} onDarkModeChange={handleDarkModeChange} />
      </div>
      <p>Copyleft Under GPLv3 and Made by Nathan A.M.</p>
    </div>
  );
}
