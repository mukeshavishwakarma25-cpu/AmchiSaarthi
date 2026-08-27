export const mockAuditLogs = [
  {
    id: 'LOG-8801',
    timestamp: '2026-08-26T14:32:00Z',
    actorId: 'OFF-202',
    actorName: 'Vikram Deshmukh',
    actorRole: 'OFFICER',
    action: 'APPLICATION_REVIEWED',
    entityType: 'APPLICATION',
    entityId: 'APP-502',
    details: 'Reviewed MPCB Consent to Establish; flagged document resolution discrepancy.',
    ipAddress: '10.24.112.45',
    status: 'SUCCESS'
  },
  {
    id: 'LOG-8802',
    timestamp: '2026-08-26T13:15:20Z',
    actorId: 'USR-101',
    actorName: 'Rajesh Kumar',
    actorRole: 'USER',
    action: 'APPLICATION_SUBMITTED',
    entityType: 'APPLICATION',
    entityId: 'APP-501',
    details: 'Submitted Shop & Establishment Registration application.',
    ipAddress: '115.114.88.19',
    status: 'SUCCESS'
  },
  {
    id: 'LOG-8803',
    timestamp: '2026-08-26T11:45:00Z',
    actorId: 'ADM-303',
    actorName: 'Amit Joshi',
    actorRole: 'ADMIN',
    action: 'OFFICER_AUTHORIZED',
    entityType: 'OFFICER',
    entityId: 'OFF-202',
    details: 'Assigned Vikram Deshmukh to Industries Department (Pune North Zone).',
    ipAddress: '10.10.2.14',
    status: 'SUCCESS'
  },
  {
    id: 'LOG-8804',
    timestamp: '2026-08-25T17:20:10Z',
    actorId: 'USR-101',
    actorName: 'Rajesh Kumar',
    actorRole: 'USER',
    action: 'DOCUMENT_UPLOADED',
    entityType: 'DOCUMENT',
    entityId: 'DOC-401',
    details: 'Uploaded Electricity Bill (MSEDCL) to Document Vault.',
    ipAddress: '115.114.88.19',
    status: 'SUCCESS'
  },
  {
    id: 'LOG-8805',
    timestamp: '2026-08-25T10:05:44Z',
    actorId: 'SYSTEM',
    actorName: 'AI Rules Engine',
    actorRole: 'SYSTEM',
    action: 'ROADMAP_GENERATED',
    entityType: 'BUSINESS',
    entityId: 'BIZ-201',
    details: 'Generated 6-step compliance roadmap for GreenTech Agro Processing Pvt Ltd.',
    ipAddress: '127.0.0.1',
    status: 'SUCCESS'
  }
];
