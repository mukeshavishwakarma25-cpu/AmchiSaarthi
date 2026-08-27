import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Table from '../../components/common/Table';

export default function AdminOfficersPage() {
  const [officers, setOfficers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [editOfficer, setEditOfficer] = useState(null);
  const [selectedDept, setSelectedDept] = useState('DEP-01');
  const [zone, setZone] = useState('');

  const loadData = () => {
    setOfficers(adminService.getOfficers());
    setDepartments(adminService.getDepartments());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleReassign = (e) => {
    e.preventDefault();
    if (!editOfficer) return;
    adminService.updateOfficerAssignment(editOfficer.id, selectedDept, zone);
    setEditOfficer(null);
    loadData();
  };

  const columns = [
    { title: 'Officer ID', key: 'id', render: (val) => <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{val}</span> },
    {
      title: 'Review Officer',
      key: 'name',
      render: (val, row) => (
        <div>
          <strong>{val}</strong>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{row.email}</p>
        </div>
      )
    },
    { title: 'Designation', key: 'designation' },
    { title: 'Assigned Department', key: 'department' },
    { title: 'Jurisdiction Zone', key: 'zone' },
    {
      title: 'Actions',
      key: 'actions',
      align: 'right',
      render: (_, row) => (
        <Button
          variant="outline"
          size="sm"
          icon="edit"
          onClick={() => {
            setEditOfficer(row);
            setSelectedDept(row.departmentId || 'DEP-01');
            setZone(row.zone || '');
          }}
        >
          Reassign
        </Button>
      )
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">Manage & Authorize Review Officers</h1>
          <p className="page-subtitle">Configure departmental authority, digital sign-off rights, and district jurisdictions.</p>
        </div>
      </div>

      <Card>
        <Table columns={columns} data={officers} />
      </Card>

      {editOfficer && (
        <Modal
          isOpen={!!editOfficer}
          onClose={() => setEditOfficer(null)}
          title={`Reassign Jurisdiction - ${editOfficer.name}`}
        >
          <form onSubmit={handleReassign}>
            <div className="input-group">
              <label className="input-label">Select Department</label>
              <select
                className="input-field"
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
              >
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Jurisdiction Zone / District"
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              placeholder="e.g. Pune North Zone, Hinjewadi MIDC"
              required
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
              <Button variant="ghost" onClick={() => setEditOfficer(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" icon="check">
                Save & Audit Reassignment
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
