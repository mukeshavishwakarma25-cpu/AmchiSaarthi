import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

export default function UserProfilePage() {
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 className="page-title">{t('nav.profile')}</h1>
        <p className="page-subtitle">Manage personal contact details and security credentials.</p>
      </div>

      <Card>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', overflow: 'hidden', backgroundColor: 'var(--color-primary-container)' }}>
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span className="material-symbols-outlined" style={{ fontSize: '72px', color: 'var(--color-primary)' }}>account_circle</span>
            )}
          </div>
          <div>
            <h2 style={{ fontSize: '1.3rem', color: 'var(--color-primary-dark)' }}>{user?.name || 'Rajesh Kumar'}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>{user?.designation} • {user?.email}</p>
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Input label="Full Name" defaultValue={user?.name} />
            <Input label="Email Address" defaultValue={user?.email} disabled />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Input label="Mobile Number" defaultValue={user?.mobile} />
            <Input label="Designation" defaultValue={user?.designation} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
            <Button variant="primary" icon="save">
              Save Account Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
