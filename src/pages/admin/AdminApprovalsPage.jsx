import React, { useState, useEffect } from 'react';
import { approvalService } from '../../services/approvalService';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';

export default function AdminApprovalsPage() {
  const [approvals, setApprovals] = useState([]);

  useEffect(() => {
    setApprovals(approvalService.getApprovals());
  }, []);

  const columns = [
    { title: 'Code', key: 'code', render: (val) => <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{val}</span> },
    {
      title: 'Clearance Name',
      key: 'name',
      render: (val, row) => (
        <div>
          <strong>{val}</strong>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{row.description}</p>
        </div>
      )
    },
    { title: 'Department', key: 'departmentName' },
    { title: 'Phase', key: 'phase' },
    { title: 'Processing SLA', key: 'processingDays', render: (val) => `${val} Days` },
    { title: 'Statutory Fee', key: 'fee', render: (val) => <strong>{val}</strong> }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 className="page-title">Statutory Approvals & Clearances Master</h1>
        <p className="page-subtitle">Standardized catalog of state and municipal licenses, certificates, and NOCs.</p>
      </div>

      <Card>
        <Table columns={columns} data={approvals} />
      </Card>
    </div>
  );
}
