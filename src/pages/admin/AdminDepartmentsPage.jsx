import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';

export default function AdminDepartmentsPage() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    setDepartments(adminService.getDepartments());
  }, []);

  const columns = [
    { title: 'Dept Code', key: 'code', render: (val) => <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{val}</span> },
    {
      title: 'Department Name',
      key: 'name',
      render: (val, row) => (
        <div>
          <strong>{val}</strong>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{row.description}</p>
        </div>
      )
    },
    { title: 'Nodal Officer', key: 'nodalOfficer' },
    { title: 'Active Approvals', key: 'activeApprovals' },
    {
      title: 'Average SLA',
      key: 'slaAverageDays',
      render: (val) => <strong>{val} Days</strong>
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 className="page-title">Integrated State Departments</h1>
        <p className="page-subtitle">Government bodies integrated into the AmchiSaarthi single-window gateway.</p>
      </div>

      <Card>
        <Table columns={columns} data={departments} />
      </Card>
    </div>
  );
}
