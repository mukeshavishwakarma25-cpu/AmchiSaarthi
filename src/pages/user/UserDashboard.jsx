import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { applicationService } from '../../services/applicationService';
import { businessService } from '../../services/businessService';
import { documentService } from '../../services/documentService';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/common/StatusBadge';
import './UserDashboard.css';

export default function UserDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [applications, setApplications] = useState([]);
  const [business, setBusiness] = useState(null);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    setApplications(applicationService.getApplications());
    setBusiness(businessService.getBusinessById('BIZ-201'));
    setDocuments(documentService.getDocuments());
  }, []);

  const pendingCorrectionCount = applications.filter((a) => a.status === 'ACTION_REQUIRED').length;
  const underReviewCount = applications.filter((a) => a.status === 'UNDER_REVIEW' || a.status === 'SUBMITTED').length;
  const approvedCount = applications.filter((a) => a.status === 'APPROVED').length;

  return (
    <div className="user-dashboard">
      {/* Welcome Banner */}
      <div className="dashboard-welcome-banner">
        <div className="welcome-text-col">
          <span className="welcome-tag">
            <span className="material-symbols-outlined">verified</span>
            {business?.name || 'GreenTech Solutions Pvt Ltd'} • {business?.udyogAadhaar || 'MH-26-0089123'}
          </span>
          <h1 className="welcome-heading">
            {t('user.welcome') || 'Welcome back'}, {user?.name || 'Rajesh Kumar'}
          </h1>
          <p className="welcome-sub">
            Your single-window compliance orchestration dashboard for Maharashtra. You have {pendingCorrectionCount} application(s) needing your correction.
          </p>
        </div>
        <div className="welcome-actions">
          <NavLink to="/user/roadmap">
            <Button variant="secondary" icon="alt_route">
              {t('common.viewRoadmap')}
            </Button>
          </NavLink>
          <NavLink to="/user/applications">
            <Button variant="outline" icon="add">
              New Application
            </Button>
          </NavLink>
        </div>
      </div>

      {/* Action Required Alert Banner if any */}
      {pendingCorrectionCount > 0 && (
        <div className="action-required-strip">
          <span className="material-symbols-outlined action-strip-icon">notification_important</span>
          <div className="action-strip-content">
            <h4>Action Required on Factory Building Plan & Safety Approval</h4>
            <p>Officer requested updated architectural drawings with emergency egress dimensions.</p>
          </div>
          <NavLink to="/user/applications">
            <Button variant="danger" size="sm" iconRight="arrow_forward">
              Review & Resubmit
            </Button>
          </NavLink>
        </div>
      )}

      {/* Metrics Row */}
      <div className="dashboard-metrics-grid">
        <div className="metric-card">
          <div className="metric-icon-wrap review-icon">
            <span className="material-symbols-outlined">hourglass_top</span>
          </div>
          <div className="metric-info">
            <span className="metric-number">{underReviewCount}</span>
            <span className="metric-title">{t('status.UNDER_REVIEW')}</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-wrap action-icon">
            <span className="material-symbols-outlined">error_outline</span>
          </div>
          <div className="metric-info">
            <span className="metric-number">{pendingCorrectionCount}</span>
            <span className="metric-title">{t('status.ACTION_REQUIRED')}</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-wrap approved-icon">
            <span className="material-symbols-outlined">check_circle</span>
          </div>
          <div className="metric-info">
            <span className="metric-number">{approvedCount}</span>
            <span className="metric-title">{t('status.APPROVED')}</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-wrap docs-icon">
            <span className="material-symbols-outlined">folder_shared</span>
          </div>
          <div className="metric-info">
            <span className="metric-number">{documents.length}</span>
            <span className="metric-title">Vault Documents</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-main-grid">
        {/* Recent Applications Card */}
        <Card
          title="Active Statutory Applications"
          subtitle="Real-time status and department progress tracking"
          actions={
            <NavLink to="/user/applications">
              <Button variant="ghost" size="sm" iconRight="arrow_forward">
                View All
              </Button>
            </NavLink>
          }
          className="applications-card"
        >
          <div className="applications-list">
            {applications.slice(0, 3).map((app) => (
              <div key={app.id} className="app-item-row">
                <div className="app-item-main">
                  <div className="app-item-title-row">
                    <h4 className="app-item-title">{app.title}</h4>
                    <StatusBadge status={app.status} />
                  </div>
                  <p className="app-item-dept">
                    <span className="material-symbols-outlined item-dept-icon">domain</span>
                    {app.department}
                  </p>
                  <div className="app-item-meta">
                    <span>ID: <strong>{app.id}</strong></span>
                    <span>Submitted: {app.submittedDate}</span>
                    <span>Fee: {app.feePaid}</span>
                  </div>
                </div>
                <div className="app-item-action">
                  <NavLink to={`/user/applications`}>
                    <Button variant="outline" size="sm" iconRight="chevron_right">
                      Details
                    </Button>
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Compliance Roadmap Widget */}
        <Card
          title="Compliance Roadmap Progress"
          subtitle="Statutory journey from setup to commercial operation"
          actions={
            <NavLink to="/user/roadmap">
              <Button variant="ghost" size="sm" iconRight="arrow_forward">
                Roadmap
              </Button>
            </NavLink>
          }
        >
          <div className="roadmap-preview-list">
            <div className="roadmap-preview-step done">
              <div className="step-circle"><span className="material-symbols-outlined">check</span></div>
              <div className="step-content">
                <h5>Phase 1: Pre-Establishment Clearances</h5>
                <p>Entity registration & MPCB Consent to Establish</p>
              </div>
            </div>
            <div className="roadmap-preview-step current">
              <div className="step-circle">2</div>
              <div className="step-content">
                <h5>Phase 2: Setup & Construction Sanctions</h5>
                <p>Factory safety approval & Fire NOC</p>
              </div>
            </div>
            <div className="roadmap-preview-step next">
              <div className="step-circle">3</div>
              <div className="step-content">
                <h5>Phase 3: Pre-Operation Clearances</h5>
                <p>Trade license & Bulk water utility connection</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
