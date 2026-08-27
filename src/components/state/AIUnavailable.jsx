import React from 'react';
import { NavLink } from 'react-router-dom';

export default function AIUnavailable({ onRetry }) {
  return (
    <div style={{
      padding: '24px',
      backgroundColor: '#fffbeb',
      border: '1px solid #fde68a',
      borderRadius: 'var(--radius-lg)',
      display: 'flex',
      gap: '16px',
      alignItems: 'flex-start',
      margin: '16px 0'
    }}>
      <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#d97706' }}>
        bolt
      </span>
      <div style={{ flex: 1 }}>
        <h4 style={{ color: '#92400e', fontSize: '1rem', marginBottom: '4px' }}>
          AI Intelligence Service Temporarily Offline
        </h4>
        <p style={{ color: '#78350f', fontSize: '0.88rem', lineHeight: '1.5', marginBottom: '12px' }}>
          The intelligent query engine is currently undergoing maintenance. You can still access standard static roadmaps, manual form submissions, and direct Department Knowledge Base guides below.
        </p>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <NavLink
            to="/user/roadmap"
            style={{
              fontSize: '0.85rem',
              fontWeight: '600',
              color: '#92400e',
              textDecoration: 'underline'
            }}
          >
            Explore Static Compliance Directory →
          </NavLink>
          {onRetry && (
            <button
              onClick={onRetry}
              style={{
                fontSize: '0.85rem',
                fontWeight: '600',
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: '#fef3c7',
                border: '1px solid #fcd34d',
                color: '#92400e'
              }}
            >
              Retry AI Connection
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
