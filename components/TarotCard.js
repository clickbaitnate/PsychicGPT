// components/TarotCard.js

import React from 'react';
import Image from 'next/image';
import styles from './TarotCard.module.css';

const TarotCard = ({ card, inverted }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={`${styles.cardImageWrapper} ${inverted === 1 ? styles.inverted : ''}`}>
        <Image
          src={`/cards/${card.img}`}
          alt={card.name}
          width={150}
          height={300}
          className={styles.cardImage}
        />
      </div>
      <div className={styles.cardDescription}>
        <h3>{card.name}</h3>
        <p>{card.arcana}</p>
        <div className={styles.meanings}>
          <h4>{inverted === 0 ? 'Light' : 'Shadow'}</h4>
          <ul>
            {card.meanings[inverted === 0 ? 'light' : 'shadow'].map((meaning, index) => (
              <li key={index}>{meaning}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TarotCard;

