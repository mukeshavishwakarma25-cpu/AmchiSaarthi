import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import Button from '../../components/common/Button';
import './HomePage.css';

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="app-container hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="material-symbols-outlined hero-badge-icon">verified</span>
              <span>{t('public.heroTag')}</span>
            </div>
            <h1 className="hero-title">
              <span className="hero-title-highlight">Empowering</span> Citizens through{' '}
              <span className="hero-title-highlight">Digital</span> Governance
            </h1>
            <p className="hero-desc">{t('public.heroDesc')}</p>

            <div className="hero-actions">
              <NavLink to="/register">
                <Button className="hero-btn-explore" size="lg" iconRight="arrow_forward">
                  {t('public.exploreBtn')}
                </Button>
              </NavLink>
              <NavLink to="/login">
                <Button className="hero-btn-track" size="lg">
                  {t('public.trackBtn')}
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Grid */}
      <section className="features-preview-section">
        <div className="app-container">
          <div className="section-header text-center">
            <h2 className="section-title">Why Maharashtra MSMEs Choose AmchiSaarthi</h2>
            <p className="section-subtitle">Revolutionizing business compliance with intelligent government automation.</p>
          </div>

          <div className="features-grid">
            <div className="feature-box">
              <div className="feature-icon-wrap" style={{ backgroundColor: '#e7eefe', color: '#00236f' }}>
                <span className="material-symbols-outlined">auto_awesome</span>
              </div>
              <h3>AI Roadmap Engine</h3>
              <p>Enter your business activity, worker scale, and location to automatically calculate all required statutory licenses.</p>
            </div>

            <div className="feature-box">
              <div className="feature-icon-wrap" style={{ backgroundColor: '#fff3e6', color: '#8f4e00' }}>
                <span className="material-symbols-outlined">document_scanner</span>
              </div>
              <h3>Document Vault & OCR</h3>
              <p>Upload once, reuse across all department applications with automatic discrepancy detection and expiry alerts.</p>
            </div>

            <div className="feature-box">
              <div className="feature-icon-wrap" style={{ backgroundColor: '#e0f6f4', color: '#006a61' }}>
                <span className="material-symbols-outlined">verified_user</span>
              </div>
              <h3>Statutory SLA Tracking</h3>
              <p>Transparent real-time application audit trail with strict officer resolution SLAs under Maharashtra RTS Act.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
