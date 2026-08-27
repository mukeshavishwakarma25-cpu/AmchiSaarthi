import React from 'react';
import './Input.css';

export default function Input({
  label,
  error,
  helperText,
  icon,
  type = 'text',
  required = false,
  className = '',
  id,
  ...rest
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`input-group ${error ? 'has-error' : ''} ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label} {required && <span className="input-required">*</span>}
        </label>
      )}
      <div className="input-wrapper">
        {icon && <span className="material-symbols-outlined input-icon">{icon}</span>}
        <input
          id={inputId}
          type={type}
          className={`input-field ${icon ? 'with-icon' : ''}`}
          required={required}
          {...rest}
        />
      </div>
      {error && <p className="input-error-msg">{error}</p>}
      {helperText && !error && <p className="input-helper-msg">{helperText}</p>}
    </div>
  );
}
