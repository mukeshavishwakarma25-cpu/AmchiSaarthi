import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';

export default function AdminRulesPage() {
  const [rules, setRules] = useState([]);

  useEffect(() => {
    setRules(adminService.getRules());
  }, []);

  const columns = [
    { title: 'Rule ID', key: 'id', render: (val) => <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{val}</span> },
    { title: 'Rule Description', key: 'name', render: (val) => <strong>{val}</strong> },
    { title: 'Category', key: 'category' },
    {
      title: 'Boolean Condition Logic',
      key: 'condition',
      render: (val) => <code style={{ backgroundColor: 'var(--bg-app)', padding: '2px 6px', borderRadius: '4px' }}>{val}</code>
    },
    { title: 'Triggered Statutory Action', key: 'action' },
    {
      title: 'Status',
      key: 'status',
      render: (val) => <span style={{ color: '#138808', fontWeight: '700', fontSize: '0.8rem' }}>{val}</span>
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 className="page-title">Statutory Decision Rules & Triggers Engine</h1>
        <p className="page-subtitle">Configurable rule definitions evaluated to generate dynamic business compliance roadmaps.</p>
      </div>

      <Card>
        <Table columns={columns} data={rules} />
      </Card>
    </div>
  );
}
