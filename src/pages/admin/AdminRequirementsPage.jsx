import React from 'react';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';

export default function AdminRequirementsPage() {
  const requirements = [
    {
      id: 'REQ-01',
      docName: 'Site Elevation & Architectural Floor Plan',
      clearance: 'Factory Building Plan Approval (APP-TYPE-02)',
      format: 'PDF / CAD (Vector)',
      maxSize: '25 MB',
      mandatoryFields: 'Emergency egress width (2.0m min), Fire hydrants, Ventilation ratio'
    },
    {
      id: 'REQ-02',
      docName: 'Water Balance & Effluent Treatment Scheme',
      clearance: 'MPCB Consent to Establish (APP-TYPE-03)',
      format: 'PDF',
      maxSize: '15 MB',
      mandatoryFields: 'Daily intake (KL/day), COD/BOD discharge limits, Sludge disposal'
    },
    {
      id: 'REQ-03',
      docName: 'Registered Rent Agreement / Sale Deed',
      clearance: 'Municipal Trade License (APP-TYPE-01)',
      format: 'PDF / Scan',
      maxSize: '10 MB',
      mandatoryFields: 'Survey No., City Title registration, Property Tax receipt'
    }
  ];

  const columns = [
    { title: 'Req ID', key: 'id', render: (val) => <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{val}</span> },
    { title: 'Document Title', key: 'docName', render: (val) => <strong>{val}</strong> },
    { title: 'Applicable Clearance', key: 'clearance' },
    { title: 'Permitted Format', key: 'format' },
    { title: 'Mandatory Technical Parameters', key: 'mandatoryFields' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 className="page-title">Document Requirements & Technical Schemas</h1>
        <p className="page-subtitle">Standardized statutory attachments, file type limits, and AI OCR validation rules.</p>
      </div>

      <Card>
        <Table columns={columns} data={requirements} />
      </Card>
    </div>
  );
}
