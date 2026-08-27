import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(adminService.getUsers());
  }, []);

  const columns = [
    { title: 'User ID', key: 'id', render: (val) => <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{val}</span> },
    {
      title: 'Entrepreneur Name',
      key: 'name',
      render: (val, row) => (
        <div>
          <strong>{val}</strong>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{row.email}</p>
        </div>
      )
    },
    { title: 'Designation', key: 'designation' },
    { title: 'Mobile', key: 'mobile' },
    { title: 'Business Linked', key: 'businessId' },
    {
      title: 'Status',
      key: 'status',
      render: () => <span style={{ color: '#138808', fontWeight: '700', fontSize: '0.8rem' }}>ACTIVE</span>
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 className="page-title">Manage Registered MSME Users</h1>
        <p className="page-subtitle">Directory of business proprietors and authorized enterprise signatories.</p>
      </div>

      <Card>
        <Table columns={columns} data={users} />
      </Card>
    </div>
  );
}
