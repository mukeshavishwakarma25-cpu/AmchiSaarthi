import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../../components/common/Button';

export default function FeaturesPage() {
  const featureList = [
    {
      title: 'Centralized Multilingual Interface',
      desc: 'Seamless real-time switching between English, Hindi, and Marathi with full Devanagari typographic harmony.',
      icon: 'translate',
      color: '#00236f'
    },
    {
      title: 'Contextual AI Compliance Copilot',
      desc: 'RAG-powered conversational engine referencing Maharashtra Industrial Acts, gazettes, and municipal bye-laws.',
      icon: 'smart_toy',
      color: '#006a61'
    },
    {
      title: 'AI Document Intelligence & Inspection',
      desc: 'Instant OCR extraction of license details, expiry tracking, and mismatch detection between applicant names.',
      icon: 'document_scanner',
      color: '#8f4e00'
    },
    {
      title: 'Tamper-Evident Audit Trail',
      desc: 'Immutable timeline tracking every statutory transition, officer action, and resubmission for complete transparency.',
      icon: 'history_edu',
      color: '#138808'
    },
    {
      title: 'Role-Segregated Workspaces',
      desc: 'Tailored interfaces for Entrepreneurs, Reviewing Officers, Department Heads, and System Administrators.',
      icon: 'admin_panel_settings',
      color: '#7c3aed'
    },
    {
      title: 'Smart Maharashtra RTS SLA Tracker',
      desc: 'Guaranteed delivery of public services within notified statutory timelines with automatic escalation triggers.',
      icon: 'speed',
      color: '#d97706'
    }
  ];

  return (
    <div style={{ padding: '64px 0', backgroundColor: 'var(--bg-app)' }}>
      <div className="app-container">
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 56px' }}>
          <span style={{ color: 'var(--color-secondary)', fontWeight: '700', fontSize: '0.88rem', textTransform: 'uppercase' }}>
            Platform Capabilities
          </span>
          <h1 style={{ fontSize: '2.4rem', color: 'var(--color-primary-dark)', margin: '12px 0' }}>
            Engineered for High-Velocity Compliance
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Explore cutting-edge features built to eliminate regulatory hurdles for Maharashtra’s vibrant entrepreneurial ecosystem.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', marginBottom: '64px' }}>
          {featureList.map((f, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-lg)',
                padding: '32px',
                border: '1px solid var(--border-structural)',
                transition: 'transform var(--transition-fast)'
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: `${f.color}15`,
                  color: f.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>
                  {f.icon}
                </span>
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary-dark)', marginBottom: '10px' }}>{f.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>{f.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <NavLink to="/login">
            <Button variant="primary" size="lg" iconRight="arrow_forward">
              Experience the Live Platform
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
