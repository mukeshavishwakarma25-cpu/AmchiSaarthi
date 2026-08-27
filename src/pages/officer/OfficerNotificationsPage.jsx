import React from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { useLanguage } from '../../i18n/LanguageContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

export default function OfficerNotificationsPage() {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();
  const { t } = useLanguage();

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">{t('nav.notifications')}</h1>
          <p className="page-subtitle">Queue routing alerts, escalation triggers, and departmental circulars.</p>
        </div>
        <Button variant="outline" size="sm" icon="done_all" onClick={markAllAsRead}>
          Mark all as read
        </Button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {notifications.map((n) => (
          <Card
            key={n.id}
            style={{
              backgroundColor: n.read ? 'var(--bg-surface)' : '#f0fdfa',
              borderLeft: '4px solid var(--color-accent-teal)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--color-accent-teal)', fontSize: '24px' }}>
                  assignment
                </span>
                <div>
                  <h4 style={{ fontSize: '1rem', color: 'var(--color-primary-dark)', marginBottom: '4px' }}>{n.title}</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{n.message}</p>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px', display: 'block' }}>
                    {n.date}
                  </span>
                </div>
              </div>
              {!n.read && (
                <Button variant="ghost" size="sm" onClick={() => markAsRead(n.id)}>
                  Mark as read
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
