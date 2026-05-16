import React from 'react';
import './base.css';
import './variables.css';
import './cards.css';
import './theme.css';

export default function Card({ children, className = '', padded = true, ...props }) {
  const classes = ['ui-card', className, padded ? '' : 'ui-card--no-pad'].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}