import React from 'react';
import Button from '../common/Button';

export default function ErrorState({
  title = 'Something went wrong',
  description = 'Unable to load content. Please try again.',
  onRetry
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px',
      textAlign: 'center',
      backgroundColor: 'var(--color-error-container)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid #ffdad6',
      margin: '16px 0'
    }}>
      <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--color-error)', marginBottom: '12px' }}>
        error_outline
      </span>
      <h4 style={{ color: 'var(--color-error)', marginBottom: '6px', fontSize: '1.1rem' }}>{title}</h4>
      <p style={{ color: '#410002', fontSize: '0.9rem', maxWidth: '420px', marginBottom: onRetry ? '18px' : '0' }}>
        {description}
      </p>
      {onRetry && (
        <Button variant="danger" icon="refresh" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}
