import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';
import './AppHeader.css';

export default function AppHeader({ sidebarWidth = 272, isSidebarCollapsed, onToggleSidebar }) {
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <header
      className="app-header"
      style={{
        left: `${sidebarWidth}px`,
        transition: 'left 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div className="header-left">
        {/* Mobile hamburger (shows when sidebar is hidden on mobile) */}
        <button
          className="header-menu-btn"
          onClick={onToggleSidebar}
          aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <span className="material-symbols-outlined">
            {isSidebarCollapsed ? 'menu_open' : 'menu'}
          </span>
        </button>

        <div className="header-search">
          <span className="material-symbols-outlined search-icon">search</span>
          <input
            className="header-search-input"
            type="text"
            placeholder={t('common.searchPlaceholder')}
          />
        </div>
      </div>

      <div className="header-right">
        <button className="header-notification-btn" aria-label={t('nav.notifications')}>
          <span className="material-symbols-outlined">notifications</span>
          <span className="notification-dot"></span>
        </button>
        <div className="header-user">
          <div className="header-user-info">
            <p className="header-user-name">{user?.name || 'Guest'}</p>
            <p className="header-user-role">{user?.designation || t(`roles.${user?.role || 'USER'}`)}</p>
          </div>
          <div className="header-avatar">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <span className="material-symbols-outlined">account_circle</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
