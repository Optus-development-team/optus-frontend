import React from 'react';
import './base.css';
import './variables.css';
import './buttons.css';
import './theme.css';

export default function Button({ children, variant = 'primary', size = 'md', icon = null, ...props }) {
  const sizeClass = size === 'lg' ? 'btn-lg' : size === 'sm' ? 'btn-sm' : '';
  const className = `btn btn-${variant} ${sizeClass}`.trim();

  return (
    <button className={className} {...props}>
      {icon}
      {children}
    </button>
  );
}
