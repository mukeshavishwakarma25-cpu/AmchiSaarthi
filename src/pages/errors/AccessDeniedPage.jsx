import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';

export default function AccessDeniedPage() {
  const { role, switchRole } = useAuth();

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
      <span className="material-symbols-outlined" style={{ fontSize: '80px', color: 'var(--color-error)', marginBottom: '16px' }}>
        gpp_bad
      </span>
      <h1 style={{ fontSize: '3rem', color: 'var(--color-error)', marginBottom: '8px' }}>403</h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Access Denied</h2>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', marginBottom: '24px' }}>
        You do not have the required statutory credentials or role permissions to view this administrative dashboard.
      </p>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <NavLink to="/">
          <Button variant="outline" icon="home">
            Return Home
          </Button>
        </NavLink>
        <Button variant="primary" icon="switch_account" onClick={() => switchRole('ADMIN')}>
          Switch to Admin Demo Role
        </Button>
      </div>
    </div>
  );
}
