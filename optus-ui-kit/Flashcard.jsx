import React from 'react';
import './base.css';
import './variables.css';
import './cards.css';
import './theme.css';

export default function Flashcard({ title, stat, description, icon = null }) {
  return (
    <div className="flashcard">
      <div className="flashcard-inner">
        <div className="flashcard-front">
          <div className="flashcard-icon">{icon}</div>
          <h3>{title}</h3>
          <div className="flashcard-stat">{stat}</div>
        </div>
        <div className="flashcard-back">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
