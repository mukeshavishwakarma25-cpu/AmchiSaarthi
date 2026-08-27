import React from 'react';
import Button from '../common/Button';

export default function EmptyState({
  icon = 'inbox',
  title = 'No records found',
  description = 'There is no data to display right now.',
  actionLabel,
  onAction
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px',
      textAlign: 'center',
      backgroundColor: 'var(--bg-surface)',
      borderRadius: 'var(--radius-lg)',
      border: '1px dashed var(--border-structural)',
      margin: '16px 0'
    }}>
      <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--text-light)', marginBottom: '12px' }}>
        {icon}
      </span>
      <h4 style={{ color: 'var(--text-primary)', marginBottom: '6px', fontSize: '1.1rem' }}>{title}</h4>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '400px', marginBottom: actionLabel ? '20px' : '0' }}>
        {description}
      </p>
      {actionLabel && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
