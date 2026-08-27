import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../../components/common/Button';

export default function NotFoundPage() {
  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '40px 20px'
    }}>
      <span className="material-symbols-outlined" style={{ fontSize: '80px', color: 'var(--color-primary-light)', marginBottom: '16px' }}>
        travel_explore
      </span>
      <h1 style={{ fontSize: '3rem', color: 'var(--color-primary-dark)', marginBottom: '8px' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', marginBottom: '24px' }}>
        The government compliance page or clearance form you requested does not exist or has been moved.
      </p>
      <NavLink to="/">
        <Button variant="primary" icon="home">
          Return to Portal Home
        </Button>
      </NavLink>
    </div>
  );
}
