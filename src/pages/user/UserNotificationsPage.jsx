import React from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { useLanguage } from '../../i18n/LanguageContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

export default function UserNotificationsPage() {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();
  const { t } = useLanguage();

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">{t('nav.notifications')}</h1>
          <p className="page-subtitle">Statutory updates, officer correction requests, and system alerts.</p>
        </div>
        <Button variant="outline" size="sm" icon="done_all" onClick={markAllAsRead}>
          Mark all as read
        </Button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {notifications.length === 0 ? (
          <Card>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '24px 0' }}>No notifications</p>
          </Card>
        ) : (
          notifications.map((n) => (
            <Card
              key={n.id}
              style={{
                backgroundColor: n.read ? 'var(--bg-surface)' : '#f0f7ff',
                borderLeft: n.type === 'ACTION_REQUIRED' ? '4px solid #dc2626' : '4px solid var(--color-primary)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span
                    className="material-symbols-outlined"
                    style={{
                      color: n.type === 'ACTION_REQUIRED' ? '#dc2626' : 'var(--color-primary)',
                      fontSize: '24px'
                    }}
                  >
                    {n.type === 'ACTION_REQUIRED' ? 'warning' : 'notifications'}
                  </span>
                  <div>
                    <h4 style={{ fontSize: '1rem', color: 'var(--color-primary-dark)', marginBottom: '4px' }}>
                      {n.title}
                    </h4>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                      {n.message}
                    </p>
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
          ))
        )}
      </div>
    </div>
  );
}
