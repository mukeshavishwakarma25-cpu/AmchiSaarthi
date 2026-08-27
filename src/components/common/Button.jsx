import React from 'react';
import './Button.css';

export default function Button({
  children,
  variant = 'primary', // primary | secondary | outline | ghost | danger | success
  size = 'md', // sm | md | lg
  icon = null,
  iconRight = null,
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...rest
}) {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${loading ? 'loading' : ''} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...rest}
    >
      {loading ? (
        <span className="btn-spinner"></span>
      ) : (
        <>
          {icon && (
            <span className="material-symbols-outlined btn-icon-left">{icon}</span>
          )}
          <span>{children}</span>
          {iconRight && (
            <span className="material-symbols-outlined btn-icon-right">{iconRight}</span>
          )}
        </>
      )}
    </button>
  );
}
