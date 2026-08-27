import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../../components/common/Button';

export default function AboutPage() {
  return (
    <div style={{ padding: '64px 0', backgroundColor: 'var(--bg-app)' }}>
      <div className="app-container" style={{ maxWidth: '960px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ color: 'var(--color-secondary)', fontWeight: '700', fontSize: '0.88rem', textTransform: 'uppercase' }}>
            About the Initiative
          </span>
          <h1 style={{ fontSize: '2.4rem', color: 'var(--color-primary-dark)', margin: '12px 0' }}>
            Empowering Maharashtra's Industrial Horizon
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Developed under the Smart India Hackathon initiative (Problem Statement SIH26130) in alignment with the Maharashtra Industry, Energy and Labour Department.
          </p>
        </div>

        <div style={{ backgroundColor: 'var(--bg-surface)', padding: '40px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-structural)', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--color-primary-dark)', marginBottom: '16px' }}>Our Mission</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '24px' }}>
            AmchiSaarthi eliminates compliance opacity by replacing fragmented portals with a unified, intelligent single-window orchestration engine. By coupling dynamic rule logic with state-level AI advisory services, we empower every entrepreneur in Maharashtra—from rural agro-processors to urban deep-tech startups—to start, operate, and scale with statutory confidence.
          </p>

          <h2 style={{ fontSize: '1.4rem', color: 'var(--color-primary-dark)', marginBottom: '16px' }}>Core Pillars</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div style={{ padding: '16px', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-md)' }}>
              <h4 style={{ color: 'var(--color-primary)', marginBottom: '6px' }}>Ease of Doing Business</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Drastic reduction in processing overhead and physical department visits.</p>
            </div>
            <div style={{ padding: '16px', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-md)' }}>
              <h4 style={{ color: 'var(--color-primary)', marginBottom: '6px' }}>Zero Bribery & Discretion</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Transparent digital queue management and verifiable audit logs.</p>
            </div>
            <div style={{ padding: '16px', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-md)' }}>
              <h4 style={{ color: 'var(--color-primary)', marginBottom: '6px' }}>Linguistic Inclusion</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Native Marathi, Hindi, and English support for equal access across all districts.</p>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <NavLink to="/">
            <Button variant="outline" icon="arrow_back">
              Back to Home
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
