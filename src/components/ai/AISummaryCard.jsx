import React from 'react';
import './AISummaryCard.css';

export default function AISummaryCard({ summary, confidence = 0.98 }) {
  if (!summary) return null;

  return (
    <div className="ai-summary-card">
      <div className="ai-summary-header">
        <div className="ai-badge">
          <span className="material-symbols-outlined ai-sparkle-icon">auto_awesome</span>
          <span>AI Extracted Document Data</span>
        </div>
        <span className="ai-confidence">
          Confidence: <strong>{Math.round(confidence * 100)}%</strong>
        </span>
      </div>

      <div className="ai-summary-grid">
        <div className="ai-summary-field">
          <span className="field-label">Entity / Holder Name</span>
          <span className="field-value">{summary.holderName || 'N/A'}</span>
        </div>
        <div className="ai-summary-field">
          <span className="field-label">Document Title</span>
          <span className="field-value">{summary.certificateName || 'N/A'}</span>
        </div>
        <div className="ai-summary-field">
          <span className="field-label">Certificate / Registration No.</span>
          <span className="field-value mono">{summary.certificateNumber || 'N/A'}</span>
        </div>
        <div className="ai-summary-field">
          <span className="field-label">Issue Date</span>
          <span className="field-value">{summary.issueDate || 'N/A'}</span>
        </div>
        <div className="ai-summary-field">
          <span className="field-label">Expiry Date</span>
          <span className="field-value">{summary.expiryDate || 'Permanent / Lifetime'}</span>
        </div>
        <div className="ai-summary-field">
          <span className="field-label">Issuing Authority</span>
          <span className="field-value">{summary.issuingAuthority || 'Government of Maharashtra'}</span>
        </div>
      </div>

      <div className="ai-disclaimer-strip">
        <span className="material-symbols-outlined disclaimer-icon">info</span>
        <span>AI extraction is advisory. Verify original document scan before final statutory approval.</span>
      </div>
    </div>
  );
}
