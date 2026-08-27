import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import { adminService } from '../../services/adminService';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const { t } = useLanguage();
  const [stats, setStats] = useState({ totalUsers: 0, totalOfficers: 0, totalDepartments: 0, slaComplianceRate: '96.4%' });
  const [recentLogs, setRecentLogs] = useState([]);

  useEffect(() => {
    setStats(adminService.getStats());
    setRecentLogs(adminService.getAuditLogs().slice(0, 5));
  }, []);

  const logColumns = [
    { title: 'Log ID', key: 'id', render: (val) => <span className="mono-tag">{val}</span> },
    { title: 'Timestamp', key: 'timestamp', render: (val) => new Date(val).toLocaleString() },
    { title: 'Actor', key: 'actorName', render: (val, row) => <span>{val} ({row.actorRole})</span> },
    { title: 'Action', key: 'action', render: (val) => <strong>{val}</strong> },
    { title: 'Details', key: 'details' }
  ];

  return (
    <div className="admin-dashboard">
      <div className="admin-welcome-banner">
        <div>
          <span className="admin-badge">
            <span className="material-symbols-outlined">shield_person</span>
            Platform Governance Engine (SIH26130)
          </span>
          <h1 className="admin-title">State Administration Console</h1>
          <p className="admin-sub">
            Oversee user registrations, authorize reviewing officers, configure clearance rules, and audit tamper-evident system logs.
          </p>
        </div>
        <div className="admin-banner-actions">
          <NavLink to="/admin/rules">
            <Button variant="secondary" icon="rule">
              Manage Rules Engine
            </Button>
          </NavLink>
        </div>
      </div>

      <div className="admin-metrics-grid">
        <div className="admin-metric-card">
          <div className="metric-icon-wrap user-icon">
            <span className="material-symbols-outlined">people</span>
          </div>
          <div>
            <span className="metric-number">{stats.totalUsers}</span>
            <span className="metric-title">Registered Entrepreneurs</span>
          </div>
        </div>

        <div className="admin-metric-card">
          <div className="metric-icon-wrap officer-icon">
            <span className="material-symbols-outlined">badge</span>
          </div>
          <div>
            <span className="metric-number">{stats.totalOfficers}</span>
            <span className="metric-title">Authorized Review Officers</span>
          </div>
        </div>

        <div className="admin-metric-card">
          <div className="metric-icon-wrap dept-icon">
            <span className="material-symbols-outlined">account_tree</span>
          </div>
          <div>
            <span className="metric-number">{stats.totalDepartments}</span>
            <span className="metric-title">Integrated Departments</span>
          </div>
        </div>

        <div className="admin-metric-card">
          <div className="metric-icon-wrap sla-icon">
            <span className="material-symbols-outlined">verified</span>
          </div>
          <div>
            <span className="metric-number">{stats.slaComplianceRate}</span>
            <span className="metric-title">Statewide SLA Adherence</span>
          </div>
        </div>
      </div>

      <div className="admin-quick-links-grid">
        <NavLink to="/admin/users" className="admin-link-card">
          <span className="material-symbols-outlined">people</span>
          <h4>Manage Users</h4>
          <p>Inspect registered MSME accounts and compliance history</p>
        </NavLink>
        <NavLink to="/admin/officers" className="admin-link-card">
          <span className="material-symbols-outlined">badge</span>
          <h4>Officer Authorizations</h4>
          <p>Assign officers to departments and district jurisdictions</p>
        </NavLink>
        <NavLink to="/admin/rules" className="admin-link-card">
          <span className="material-symbols-outlined">rule</span>
          <h4>Rules & Triggers</h4>
          <p>Configure statutory threshold conditions and automated triggers</p>
        </NavLink>
        <NavLink to="/admin/audit-logs" className="admin-link-card">
          <span className="material-symbols-outlined">history</span>
          <h4>Tamper-Evident Logs</h4>
          <p>Complete immutable audit logs of all platform actions</p>
        </NavLink>
      </div>

      <Card
        title="Recent Statutory Audit Events"
        subtitle="Live immutable event stream across all departments"
        actions={
          <NavLink to="/admin/audit-logs">
            <Button variant="ghost" size="sm" iconRight="arrow_forward">
              Full Audit Trail
            </Button>
          </NavLink>
        }
      >
        <Table columns={logColumns} data={recentLogs} />
      </Card>
    </div>
  );
}
