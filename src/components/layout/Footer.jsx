import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import './Footer.css';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="app-footer">
      <div className="footer-top">
        <div className="footer-col brand-col">
          <div className="footer-brand">
            <span className="material-symbols-outlined footer-emblem">assured_workload</span>
            <div>
              <h4 className="footer-brand-title">{t('brand.name')}</h4>
              <p className="footer-brand-sub">{t('brand.sub')}</p>
            </div>
          </div>
          <p className="footer-desc">
            Government of Maharashtra Single-Window Clearance & Intelligent Compliance Orchestration System for MSMEs and Industrial Establishments.
          </p>
        </div>

        <div className="footer-col">
          <h5 className="footer-heading">Quick Links</h5>
          <ul className="footer-links">
            <li><a href="/">{t('nav.home')}</a></li>
            <li><a href="/how-it-works">{t('nav.howItWorks')}</a></li>
            <li><a href="/features">{t('nav.features')}</a></li>
            <li><a href="/about">{t('nav.about')}</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h5 className="footer-heading">Portals & Departments</h5>
          <ul className="footer-links">
            <li><a href="https://industry.maharashtra.gov.in" target="_blank" rel="noreferrer">Industries Department</a></li>
            <li><a href="https://mpcb.gov.in" target="_blank" rel="noreferrer">MPCB Portal</a></li>
            <li><a href="https://mahadma.maharashtra.gov.in" target="_blank" rel="noreferrer">Urban Development (DMA)</a></li>
            <li><a href="https://aaplesarkar.mahaonline.gov.in" target="_blank" rel="noreferrer">Aaple Sarkar</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h5 className="footer-heading">Emergency & Helpdesk</h5>
          <p className="helpdesk-item"><span className="material-symbols-outlined">call</span> Toll Free: 1800-120-8040</p>
          <p className="helpdesk-item"><span className="material-symbols-outlined">mail</span> support.amchisaarthi@maharashtra.gov.in</p>
          <p className="helpdesk-item"><span className="material-symbols-outlined">schedule</span> Working Hours: 9:30 AM - 6:00 PM</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Government of Maharashtra. All rights reserved. Built for Smart India Hackathon (SIH26130).</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Accessibility Statement</a>
        </div>
      </div>
    </footer>
  );
}
