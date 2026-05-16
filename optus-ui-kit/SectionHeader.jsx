import React from 'react';
import './base.css';
import './variables.css';
import './layout.css';
import './theme.css';

export default function SectionHeader({ eyebrow, title, subtitle, align = 'center', action = null }) {
  return (
    <div className={`section-header section-header--${align}`}>
      {eyebrow ? <div className="section-eyebrow">{eyebrow}</div> : null}
      <h2 className="ui-section-title">{title}</h2>
      {subtitle ? <p className="ui-section-subtitle">{subtitle}</p> : null}
      {action ? <div className="section-header__action">{action}</div> : null}
    </div>
  );
}