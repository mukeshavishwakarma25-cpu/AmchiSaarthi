import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

export default function LoadingState({ message }) {
  const { t } = useLanguage();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 16px', gap: '16px' }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '3px solid var(--color-primary-container)',
        borderTopColor: 'var(--color-primary)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }}></div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{message || t('common.loading')}</p>
    </div>
  );
}
