import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { officerService } from '../../services/officerService';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/common/StatusBadge';
import Table from '../../components/common/Table';
import './OfficerDashboard.css';

export default function OfficerDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [stats, setStats] = useState({ total: 0, pending: 0, actionRequired: 0, approved: 0 });
  const [assignedCases, setAssignedCases] = useState([]);

  useEffect(() => {
    setStats(officerService.getStats(user?.id));
    setAssignedCases(officerService.getAssignedApplications(user?.id));
  }, [user?.id]);

  const columns = [
    {
      title: 'Application ID',
      key: 'id',
      render: (val) => <span className="officer-app-id">{val}</span>
    },
    {
      title: 'Clearance Subject',
      key: 'title',
      render: (val, row) => (
        <div>
          <strong>{val}</strong>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{row.businessName}</p>
        </div>
      )
    },
    {
      title: 'Department',
      key: 'department',
      render: (val) => <span style={{ fontSize: '0.85rem' }}>{val}</span>
    },
    {
      title: 'Submitted',
      key: 'submittedDate'
    },
    {
      title: 'Status',
      key: 'status',
      render: (val) => <StatusBadge status={val} />
    },
    {
      title: 'Action',
      key: 'actions',
      align: 'right',
      render: (_, row) => (
        <Button
          variant="primary"
          size="sm"
          icon="rate_review"
          onClick={() => navigate(`/officer/applications?id=${row.id}`)}
        >
          Review File
        </Button>
      )
    }
  ];

  return (
    <div className="officer-dashboard">
      <div className="officer-welcome-banner">
        <div>
          <span className="officer-dept-badge">
            <span className="material-symbols-outlined">badge</span>
            {user?.department || 'Industry, Energy & Labour Department'} • {user?.zone || 'Pune North Zone'}
          </span>
          <h1 className="officer-title">
            Officer Review Console • {user?.name || 'Vikram Deshmukh'}
          </h1>
          <p className="officer-sub">
            Review incoming statutory license submissions, inspect AI-extracted document metadata, and issue approvals or correction orders.
          </p>
        </div>
        <NavLink to="/officer/applications">
          <Button variant="secondary" icon="checklist">
            Start Queue Review
          </Button>
        </NavLink>
      </div>

      <div className="officer-metrics-grid">
        <div className="officer-metric-card">
          <div className="metric-icon-wrap review-icon">
            <span className="material-symbols-outlined">pending_actions</span>
          </div>
          <div>
            <span className="metric-number">{stats.pending}</span>
            <span className="metric-title">Pending Review</span>
          </div>
        </div>

        <div className="officer-metric-card">
          <div className="metric-icon-wrap action-icon">
            <span className="material-symbols-outlined">report_problem</span>
          </div>
          <div>
            <span className="metric-number">{stats.actionRequired}</span>
            <span className="metric-title">Awaiting Corrections</span>
          </div>
        </div>

        <div className="officer-metric-card">
          <div className="metric-icon-wrap approved-icon">
            <span className="material-symbols-outlined">task_alt</span>
          </div>
          <div>
            <span className="metric-number">{stats.approved}</span>
            <span className="metric-title">Sanctioned & Approved</span>
          </div>
        </div>

        <div className="officer-metric-card">
          <div className="metric-icon-wrap docs-icon">
            <span className="material-symbols-outlined">speed</span>
          </div>
          <div>
            <span className="metric-number">98.4%</span>
            <span className="metric-title">SLA Compliance Rate</span>
          </div>
        </div>
      </div>

      <Card title="Assigned Application Queue" subtitle="Applications routed to your desk based on district jurisdiction">
        <Table columns={columns} data={assignedCases} />
      </Card>
    </div>
  );
}
