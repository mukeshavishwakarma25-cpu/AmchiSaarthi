import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../../components/common/Button';

export default function HowItWorksPage() {
  const steps = [
    {
      num: '01',
      title: 'Define Your Business Profile',
      desc: 'Provide your sector (Manufacturing, Food, IT, Agro), employee count, power consumption, and location within Maharashtra.',
      icon: 'domain'
    },
    {
      num: '02',
      title: 'Automated Regulatory Roadmap Generation',
      desc: 'Our rule engine computes the exact clearances you require across Pre-Establishment, Construction, and Pre-Operation stages.',
      icon: 'alt_route'
    },
    {
      num: '03',
      title: 'One-Click Document Vault Integration',
      desc: 'Upload statutory documents once. AI verifies resolution and detects missing fields or expiry issues automatically.',
      icon: 'upload_file'
    },
    {
      num: '04',
      title: 'Transparent Officer Review & SLA Tracking',
      desc: 'Department review officers assess applications with smart issue detection. Approvals with digital signatures issued on time.',
      icon: 'fact_check'
    }
  ];

  return (
    <div style={{ padding: '64px 0', backgroundColor: 'var(--bg-app)' }}>
      <div className="app-container">
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 56px' }}>
          <span style={{ color: 'var(--color-secondary)', fontWeight: '700', fontSize: '0.88rem', textTransform: 'uppercase' }}>
            Process Flow
          </span>
          <h1 style={{ fontSize: '2.4rem', color: 'var(--color-primary-dark)', margin: '12px 0' }}>
            How AmchiSaarthi Simplifies Clearances
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.6' }}>
            From inception to commercial production, experience frictionless single-window compliance powered by GovTech intelligence.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginBottom: '64px' }}>
          {steps.map((step, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-lg)',
                padding: '32px 24px',
                border: '1px solid var(--border-structural)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              <span style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--color-primary-container)', marginBottom: '12px' }}>
                {step.num}
              </span>
              <span className="material-symbols-outlined" style={{ fontSize: '32px', color: 'var(--color-primary)', marginBottom: '16px' }}>
                {step.icon}
              </span>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-primary-dark)', marginBottom: '10px' }}>{step.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>{step.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <NavLink to="/register">
            <Button variant="primary" size="lg" iconRight="arrow_forward">
              Start Your Business Journey Today
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
