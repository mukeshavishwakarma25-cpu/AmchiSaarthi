export const mockKnowledgeBase = [
  {
    id: 'KB-01',
    title: 'Maharashtra Factories Rules, 1963 - Section 6: Plan Approvals',
    category: 'Industry & Safety',
    sourceRef: 'Govt Gazette Notice No. FAC/2021/CR-88/LAB-4',
    content: 'No building shall be constructed or used as a factory until plans and specifications have been approved by the Chief Inspector of Factories. Plans must clearly demarcate emergency staircases, minimum ceiling heights of 4.25m, and ventilation ratios.',
    applicableTo: 'All manufacturing operations with 10+ workers using electrical power.',
    updatedAt: '2024-01-10'
  },
  {
    id: 'KB-02',
    title: 'Maharashtra Pollution Control Board (MPCB) Categorization Guide',
    category: 'Environment',
    sourceRef: 'MPCB Circular MPCB/P&L/B-180802-FTS-0012',
    content: 'Industries are classified into Red, Orange, Green, and White categories based on pollution index score (PI). Orange category industries have a PI score of 41 to 59 and require Consent to Establish (CTE) before commencing civil foundation works.',
    applicableTo: 'Manufacturing, Chemical, Electroplating, Clean-tech, and Food Processing units.',
    updatedAt: '2024-02-15'
  },
  {
    id: 'KB-03',
    title: 'Maharashtra Fire Prevention & Life Safety Measures Act',
    category: 'Safety',
    sourceRef: 'Directorate of Maharashtra Fire Services Rulebook 2022',
    content: 'Provisional Fire NOC is mandatory before municipal corporation issues building commencement certificate for commercial premises exceeding 15 meters in height or 500 sq. meters built-up area.',
    applicableTo: 'Industrial factories, IT parks, Commercial malls, Warehouses.',
    updatedAt: '2023-11-20'
  },
  {
    id: 'KB-04',
    title: 'MSME Fast-Track Single-Window Clearances (Maharashtra Package Scheme of Incentives)',
    category: 'Incentives & Policies',
    sourceRef: 'Government Resolution No. PSI-2019/CR-46/IND-8',
    content: 'Eligible MSMEs are entitled to deemed approvals if designated department fails to respond within stipulated SLA timeline (14 to 21 working days).',
    applicableTo: 'Registered Micro, Small and Medium Enterprises in Maharashtra.',
    updatedAt: '2024-03-01'
  }
];

export const initialMockAuditLogs = [
  {
    id: 'LOG-8841',
    timestamp: '2023-10-14 14:02:18',
    userId: 'OFF-202',
    userName: 'Vikram Deshmukh (Officer)',
    role: 'OFFICER',
    action: 'INITIATE_DOCUMENT_REVIEW',
    entityType: 'APPLICATION',
    entityId: 'APP-2023-0891',
    details: 'Opened document review canvas and initiated AI summary extraction for MCT/TL/2022/45902.',
    status: 'SUCCESS'
  },
  {
    id: 'LOG-8840',
    timestamp: '2023-10-12 11:45:00',
    userId: 'USR-101',
    userName: 'Rajesh Kumar (Entrepreneur)',
    role: 'USER',
    action: 'SUBMIT_APPLICATION',
    entityType: 'APPLICATION',
    entityId: 'APP-2023-0891',
    details: 'Submitted Trade License Renewal application with 3 attached documents.',
    status: 'SUCCESS'
  },
  {
    id: 'LOG-8839',
    timestamp: '2023-10-02 16:30:12',
    userId: 'OFF-202',
    userName: 'Vikram Deshmukh (Officer)',
    role: 'OFFICER',
    action: 'REQUEST_CORRECTION',
    entityType: 'APPLICATION',
    entityId: 'APP-2023-0845',
    details: 'Requested correction for missing emergency egress stairwell dimensions.',
    status: 'SUCCESS'
  },
  {
    id: 'LOG-8838',
    timestamp: '2023-09-15 09:30:45',
    userId: 'ADM-303',
    userName: 'Amit Joshi (Admin)',
    role: 'ADMIN',
    action: 'AUTHORIZE_OFFICER',
    entityType: 'OFFICER',
    entityId: 'OFF-202',
    details: 'Authorized officer Vikram Deshmukh and assigned to Industry, Energy & Labour Department (North Zone Pune).',
    status: 'SUCCESS'
  }
];
