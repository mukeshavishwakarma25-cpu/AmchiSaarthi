import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    setLogs(adminService.getAuditLogs());
  }, []);

  const columns = [
    { title: 'Log ID', key: 'id', render: (val) => <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{val}</span> },
    { title: 'Timestamp', key: 'timestamp', render: (val) => new Date(val).toLocaleString() },
    {
      title: 'Actor',
      key: 'actorName',
      render: (val, row) => (
        <div>
          <strong>{val}</strong>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Role: {row.actorRole}</span>
        </div>
      )
    },
    { title: 'Action Type', key: 'action', render: (val) => <strong>{val}</strong> },
    { title: 'Entity Reference', key: 'entityId' },
    { title: 'Details', key: 'details' },
    {
      title: 'Status',
      key: 'status',
      render: () => <span style={{ color: '#138808', fontWeight: '700', fontSize: '0.8rem' }}>LOGGED</span>
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 className="page-title">Tamper-Evident System Audit Trail</h1>
        <p className="page-subtitle">Immutable compliance logs tracking all statutory transitions and officer determinations.</p>
      </div>

      <Card>
        <Table columns={columns} data={logs} />
      </Card>
    </div>
  );
}
