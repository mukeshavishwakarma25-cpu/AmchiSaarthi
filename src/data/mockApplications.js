export const initialMockApplications = [
  {
    id: 'APP-2023-0891',
    approvalId: 'APP-TYPE-01',
    title: 'Trade License Renewal',
    businessId: 'BIZ-201',
    businessName: 'GreenTech Solutions Pvt Ltd',
    applicantName: 'Rajesh Kumar',
    department: 'Urban Development & Municipal Corporation',
    departmentId: 'DEP-02',
    submittedDate: '2023-10-12',
    status: 'UNDER_REVIEW',
    priority: 'High',
    assignedOfficer: 'Vikram Deshmukh',
    assignedOfficerId: 'OFF-202',
    feePaid: '₹ 4,500',
    documents: [
      { id: 'DOC-8923', name: 'Municipal Trade License 2024.pdf', status: 'VALID', type: 'Previous License' },
      { id: 'DOC-6629', name: 'GST Registration Certificate.pdf', status: 'VALID', type: 'Tax Certificate' },
      { id: 'DOC-9011', name: 'Establishment Floor Plan.pdf', status: 'VALID', type: 'Site Plan' }
    ],
    timeline: [
      { date: '2023-10-12 10:30 AM', event: 'Application Created & Draft Saved', actor: 'Rajesh Kumar' },
      { date: '2023-10-12 11:45 AM', event: 'Application Submitted Online with Fee Receipt', actor: 'Rajesh Kumar' },
      { date: '2023-10-13 09:15 AM', event: 'Assigned to Officer Vikram Deshmukh (North Zone)', actor: 'System Auto-Router' },
      { date: '2023-10-14 02:00 PM', event: 'Document Verification in Progress', actor: 'Vikram Deshmukh' }
    ],
    aiSummary: {
      holderName: 'GreenTech Solutions Pvt Ltd',
      certificateName: 'Municipal Trade License',
      certificateNumber: 'MCT/TL/2022/45902',
      issueDate: '15-March-2022',
      expiryDate: '31-March-2023',
      issuingAuthority: 'Pune Municipal Corporation'
    },
    aiFlags: [
      {
        type: 'WARNING',
        code: 'DISCREPANCY_EXPIRY',
        title: 'Discrepancy Detected',
        description: 'The previous license expired on 31-March-2023. The application for renewal was submitted on 12-Oct-2023, exceeding standard grace period. Penalty fee calculation recommended.'
      }
    ],
    reviewRemarks: ''
  },
  {
    id: 'APP-2023-0845',
    approvalId: 'APP-TYPE-02',
    title: 'Factory Building Plan & Safety Approval',
    businessId: 'BIZ-201',
    businessName: 'GreenTech Solutions Pvt Ltd',
    applicantName: 'Rajesh Kumar',
    department: 'Industry, Energy & Labour Department',
    departmentId: 'DEP-01',
    submittedDate: '2023-09-28',
    status: 'ACTION_REQUIRED',
    priority: 'Critical',
    assignedOfficer: 'Vikram Deshmukh',
    assignedOfficerId: 'OFF-202',
    feePaid: '₹ 8,000',
    correctionReason: 'The submitted architectural elevation plan lacks emergency egress stairwell dimensions as per Section 38 of the Factories Act. Please re-upload updated architectural drawings.',
    documents: [
      { id: 'DOC-7741', name: 'Fire Safety Inspection Report.pdf', status: 'EXPIRING_SOON', type: 'Safety Inspection' },
      { id: 'DOC-9011', name: 'Establishment Floor Plan.pdf', status: 'ACTION_REQUIRED', type: 'Site Plan' }
    ],
    timeline: [
      { date: '2023-09-28 02:15 PM', event: 'Application Submitted Online', actor: 'Rajesh Kumar' },
      { date: '2023-09-29 11:00 AM', event: 'Assigned to Inspector S. K. Mahajan', actor: 'System' },
      { date: '2023-10-02 04:30 PM', event: 'Correction Requested: Emergency egress dimensions missing', actor: 'Vikram Deshmukh' }
    ],
    aiSummary: {
      holderName: 'GreenTech Solutions Pvt Ltd',
      certificateName: 'Factory Layout Blueprint',
      certificateNumber: 'FACT-MH-9941',
      issueDate: '20-September-2023',
      expiryDate: 'N/A (Structural Drawing)',
      issuingAuthority: 'Licensed Structural Engineer, Pune'
    },
    aiFlags: [
      {
        type: 'CRITICAL',
        code: 'MISSING_EGRESS',
        title: 'Missing Mandatory Dimensions',
        description: 'Fire exit door width and stairway incline measurements are missing from Section C of blueprint.'
      }
    ],
    reviewRemarks: 'Awaiting corrected elevation drawing from applicant.'
  },
  {
    id: 'APP-2023-0712',
    approvalId: 'APP-TYPE-05',
    title: 'Industrial Water Utility Connection',
    businessId: 'BIZ-201',
    businessName: 'GreenTech Solutions Pvt Ltd',
    applicantName: 'Rajesh Kumar',
    department: 'Urban Development & Municipal Corporation',
    departmentId: 'DEP-02',
    submittedDate: '2023-08-15',
    status: 'APPROVED',
    priority: 'Normal',
    assignedOfficer: 'Sunita Patil',
    assignedOfficerId: 'OFF-203',
    feePaid: '₹ 3,200',
    certificateDownloadUrl: '#',
    documents: [
      { id: 'DOC-8923', name: 'Plumbing Schematic Diagram.pdf', status: 'APPROVED', type: 'Utility Diagram' }
    ],
    timeline: [
      { date: '2023-08-15 09:00 AM', event: 'Application Submitted', actor: 'Rajesh Kumar' },
      { date: '2023-08-18 03:00 PM', event: 'Site Pipeline Assessment Passed', actor: 'Field Engineer' },
      { date: '2023-08-20 11:30 AM', event: 'Final Connection Sanctioned & Certificate Generated', actor: 'Sunita Patil' }
    ],
    reviewRemarks: 'All municipal line pressure checks verified. Connection sanction order issued.'
  }
];
