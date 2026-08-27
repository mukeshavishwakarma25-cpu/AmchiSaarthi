import { authService } from './authService';
import { mockDepartments } from '../data/mockDepartments';
import { mockApprovals } from '../data/mockApprovals';
import { mockAuditLogs } from '../data/mockAuditLogs';
import { mockKnowledgeBase } from '../data/mockKnowledgeBase';

const DEPARTMENTS_STORAGE = 'amchi_admin_departments';
const AUDIT_STORAGE = 'amchi_admin_audit_logs';
const KB_STORAGE = 'amchi_admin_kb';
const RULES_STORAGE = 'amchi_admin_rules';

const initialRules = [
  {
    id: 'RUL-01',
    name: 'Factories Act Worker Threshold Rule',
    category: 'Manufacturing',
    condition: 'employees >= 10 && hasPower == true',
    action: 'Require Factory Building Plan & Safety Approval (APP-TYPE-02)',
    status: 'ACTIVE'
  },
  {
    id: 'RUL-02',
    name: 'Municipal Trade Clearance Rule',
    category: 'Universal',
    condition: 'operatingWithinMunicipalLimits == true',
    action: 'Require Municipal Trade License (APP-TYPE-01)',
    status: 'ACTIVE'
  },
  {
    id: 'RUL-03',
    name: 'MPCB Orange Classification Effluent Rule',
    category: 'Pollution Control',
    condition: 'pollutionCategory == "ORANGE" || effluentOutput > 0',
    action: 'Require Consent to Establish CTE (APP-TYPE-03)',
    status: 'ACTIVE'
  }
];

export const adminService = {
  getStats: () => {
    const users = authService.getUsers();
    return {
      totalUsers: users.filter((u) => u.role === 'USER').length,
      totalOfficers: users.filter((u) => u.role === 'OFFICER').length,
      totalDepartments: adminService.getDepartments().length,
      totalApprovals: mockApprovals.length,
      slaComplianceRate: '96.4%'
    };
  },

  getUsers: () => {
    return authService.getUsers().filter((u) => u.role === 'USER');
  },

  getOfficers: () => {
    return authService.getUsers().filter((u) => u.role === 'OFFICER');
  },

  updateOfficerAssignment: (officerId, departmentId, zone) => {
    const users = authService.getUsers();
    const index = users.findIndex((u) => u.id === officerId);
    if (index !== -1) {
      users[index].departmentId = departmentId;
      users[index].zone = zone;
      localStorage.setItem('amchi_users', JSON.stringify(users));
      adminService.logAction('OFFICER_REASSIGNED', 'OFFICER', officerId, `Reassigned to dept ${departmentId}, zone ${zone}`);
      return users[index];
    }
    return null;
  },

  getDepartments: () => {
    const stored = localStorage.getItem(DEPARTMENTS_STORAGE);
    if (!stored) {
      localStorage.setItem(DEPARTMENTS_STORAGE, JSON.stringify(mockDepartments));
      return mockDepartments;
    }
    return JSON.parse(stored);
  },

  getRules: () => {
    const stored = localStorage.getItem(RULES_STORAGE);
    if (!stored) {
      localStorage.setItem(RULES_STORAGE, JSON.stringify(initialRules));
      return initialRules;
    }
    return JSON.parse(stored);
  },

  getKnowledgeBase: () => {
    const stored = localStorage.getItem(KB_STORAGE);
    if (!stored) {
      localStorage.setItem(KB_STORAGE, JSON.stringify(mockKnowledgeBase));
      return mockKnowledgeBase;
    }
    return JSON.parse(stored);
  },

  getAuditLogs: () => {
    const stored = localStorage.getItem(AUDIT_STORAGE);
    if (!stored) {
      localStorage.setItem(AUDIT_STORAGE, JSON.stringify(mockAuditLogs));
      return mockAuditLogs;
    }
    return JSON.parse(stored);
  },

  logAction: (action, entityType, entityId, details) => {
    const logs = adminService.getAuditLogs();
    const newLog = {
      id: `LOG-${Math.floor(8000 + Math.random() * 2000)}`,
      timestamp: new Date().toISOString(),
      actorId: 'ADM-303',
      actorName: 'Amit Joshi',
      actorRole: 'ADMIN',
      action,
      entityType,
      entityId,
      details,
      ipAddress: '10.10.2.14',
      status: 'SUCCESS'
    };
    logs.unshift(newLog);
    localStorage.setItem(AUDIT_STORAGE, JSON.stringify(logs));
    return newLog;
  }
};
