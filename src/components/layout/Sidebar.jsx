import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import LanguageSwitcher from '../common/LanguageSwitcher';
import { useLanguage } from '../../i18n/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const userNavItems = [
  { path: '/user/dashboard', icon: 'dashboard', key: 'nav.dashboard' },
  { path: '/user/roadmap', icon: 'map', key: 'nav.roadmap' },
  { path: '/user/applications', icon: 'description', key: 'nav.applications' },
  { path: '/user/documents', icon: 'folder_shared', key: 'nav.documents' },
  { path: '/user/assistant', icon: 'smart_toy', key: 'nav.assistant' },
  { path: '/user/notifications', icon: 'notifications', key: 'nav.notifications' },
  { path: '/user/profile', icon: 'person', key: 'nav.profile' },
];

const officerNavItems = [
  { path: '/officer/dashboard', icon: 'dashboard', key: 'nav.dashboard' },
  { path: '/officer/applications', icon: 'assignment', key: 'nav.assignedCases' },
  { path: '/officer/notifications', icon: 'notifications', key: 'nav.notifications' },
  { path: '/officer/profile', icon: 'person', key: 'nav.profile' },
];

const adminNavItems = [
  { path: '/admin/dashboard', icon: 'admin_panel_settings', key: 'nav.dashboard' },
  { path: '/admin/users', icon: 'people', key: 'nav.users' },
  { path: '/admin/officers', icon: 'badge', key: 'nav.officers' },
  { path: '/admin/departments', icon: 'account_tree', key: 'nav.departments' },
  { path: '/admin/approvals', icon: 'fact_check', key: 'nav.approvals' },
  { path: '/admin/requirements', icon: 'checklist', key: 'nav.requirements' },
  { path: '/admin/rules', icon: 'rule', key: 'nav.rules' },
  { path: '/admin/knowledge-base', icon: 'menu_book', key: 'nav.knowledgeBase' },
  { path: '/admin/audit-logs', icon: 'history', key: 'nav.auditLogs' },
  { path: '/admin/notifications', icon: 'notifications', key: 'nav.notifications' },
  { path: '/admin/profile', icon: 'person', key: 'nav.profile' },
];

export default function Sidebar({ isCollapsed, onToggle }) {
  const { t } = useLanguage();
  const { user, role, switchRole, logout } = useAuth();
  const navigate = useNavigate();

  let navItems = userNavItems;
  if (role === 'OFFICER') navItems = officerNavItems;
  if (role === 'ADMIN' || role === 'SUPER_ADMIN') navItems = adminNavItems;

  const handleSwitchRole = (newRole) => {
    switchRole(newRole);
    if (newRole === 'USER') navigate('/user/dashboard');
    else if (newRole === 'OFFICER') navigate('/officer/dashboard');
    else navigate('/admin/dashboard');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className={`app-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Brand */}
      <div className="sidebar-brand">
        <span
          className="material-symbols-outlined"
          style={{ fontSize: '26px', color: 'var(--color-primary)', flexShrink: 0 }}
        >
          assured_workload
        </span>
        {!isCollapsed && (
          <span className="sidebar-brand-name">{t('brand.name')}</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav" aria-label="Panel Navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            title={isCollapsed ? t(item.key) : ''}
          >
            <span className="material-symbols-outlined sidebar-icon">{item.icon}</span>
            {!isCollapsed && <span className="sidebar-label">{t(item.key)}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      {!isCollapsed ? (
        <div className="sidebar-footer">
          <LanguageSwitcher />

          <div className="sidebar-demo-section">
            <p className="sidebar-demo-title">{t('common.switchRole')}</p>
            <div className="sidebar-demo-btns">
              {['USER', 'OFFICER', 'ADMIN'].map((r) => (
                <button
                  key={r}
                  className={`sidebar-role-btn ${role === r ? 'active' : ''}`}
                  onClick={() => handleSwitchRole(r)}
                >
                  {r === 'USER' ? '👤' : r === 'OFFICER' ? '🏛️' : '⚙️'} {t(`roles.${r}`)}
                </button>
              ))}
            </div>
          </div>

          <button className="sidebar-logout" onClick={handleLogout}>
            <span className="material-symbols-outlined">logout</span>
            {t('nav.logout')}
          </button>
        </div>
      ) : (
        <div className="sidebar-footer-collapsed">
          <button
            className="sidebar-logout sidebar-icon-btn"
            onClick={handleLogout}
            title={t('nav.logout')}
            aria-label={t('nav.logout')}
          >
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>
      )}
    </aside>
  );
}
