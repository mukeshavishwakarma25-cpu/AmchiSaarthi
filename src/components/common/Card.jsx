import React from 'react';
import './Card.css';

export default function Card({
  title,
  subtitle,
  actions,
  children,
  className = '',
  hoverable = false,
  bordered = true,
  ...rest
}) {
  return (
    <div
      className={`app-card ${hoverable ? 'hoverable' : ''} ${bordered ? 'bordered' : ''} ${className}`}
      {...rest}
    >
      {(title || subtitle || actions) && (
        <div className="card-header">
          <div className="card-title-group">
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
          {actions && <div className="card-actions">{actions}</div>}
        </div>
      )}
      <div className="card-body">{children}</div>
    </div>
  );
}
