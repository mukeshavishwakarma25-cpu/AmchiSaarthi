import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import LanguageSwitcher from '../common/LanguageSwitcher';
import { useLanguage } from '../../i18n/LanguageContext';
import './PublicHeader.css';

export default function PublicHeader() {
  const { t } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/how-it-works', label: t('nav.howItWorks') },
    { path: '/features', label: t('nav.features') },
    { path: '/about', label: t('nav.about') },
  ];

  return (
    <header className="public-header">
      <div className="public-header-inner">
        <Link to="/" className="brand-logo">
          <div className="brand-emblem">
            <span className="material-symbols-outlined" style={{ fontSize: '28px', color: 'var(--color-primary)' }}>assured_workload</span>
          </div>
          <div className="brand-text">
            <span className="brand-name">{t('brand.name')}</span>
            <span className="brand-sub">{t('brand.sub')}</span>
          </div>
        </Link>

        <nav className="public-nav" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <LanguageSwitcher />
          <Link to="/login" className="btn-ghost nav-login-btn">{t('nav.login')}</Link>
          <Link to="/register" className="btn btn-primary btn-sm">{t('nav.register')}</Link>
        </div>
      </div>
    </header>
  );
}
