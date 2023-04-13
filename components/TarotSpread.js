import React, { useState } from 'react';
import TarotCard from './TarotCard';
import styles from './TarotSpread.module.css';
import TarotReading from './TarotReading';

const TarotSpread = ({ cards, onDarkModeChange }) => {
  const [spreadSize, setSpreadSize] = useState(3);
  const [spread, setSpread] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const generateSpread = () => {
    const shuffled = cards.sort(() => 0.5 - Math.random());
    setSpread(shuffled.slice(0, spreadSize).map(card => ({ ...card, inverted: Math.floor(Math.random() * 2) })));
  };

  const handleSpreadSizeChange = (event) => {
    setSpreadSize(Number(event.target.value));
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    onDarkModeChange(newDarkMode);
  };

  return (
    <div className={darkMode ? styles.darkMode : ''}>
      <button className={styles.button} onClick={toggleDarkMode}>Toggle Dark Mode</button>
      <select value={spreadSize} onChange={handleSpreadSizeChange}>
        <option value={1}>1 Card</option>
        <option value={3}>3 Cards</option>
        <option value={5}>5 Cards</option>
        <option value={7}>7 Cards</option>
      </select>
      <button className={styles.button} onClick={generateSpread}>Draw Cards</button>
      <div className={styles.tarotSpread}>
        {spread.map((card, index) => (
          <TarotCard key={index} card={card} inverted={card.inverted} />
        ))}
      </div>
      <TarotReading cards={spread} />
    </div>
  );
};

export default TarotSpread;
