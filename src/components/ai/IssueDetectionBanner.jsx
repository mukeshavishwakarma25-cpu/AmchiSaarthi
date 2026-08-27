import React from 'react';
import './IssueDetectionBanner.css';

export default function IssueDetectionBanner({ flags = [] }) {
  if (!flags || flags.length === 0) return null;

  return (
    <div className="issue-detection-container">
      {flags.map((flag, idx) => {
        const isCritical = flag.type === 'CRITICAL';
        return (
          <div
            key={idx}
            className={`issue-banner ${isCritical ? 'banner-critical' : 'banner-warning'}`}
          >
            <div className="banner-icon-col">
              <span className="material-symbols-outlined banner-icon">
                {isCritical ? 'report' : 'warning'}
              </span>
            </div>
            <div className="banner-content">
              <div className="banner-title-row">
                <h4 className="banner-title">{flag.title || 'Discrepancy Detected'}</h4>
                <span className="banner-tag">{flag.code || 'AI_FLAG'}</span>
              </div>
              <p className="banner-desc">{flag.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
