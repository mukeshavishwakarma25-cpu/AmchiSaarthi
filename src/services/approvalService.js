import { mockApprovals } from '../data/mockApprovals';

const APPROVALS_STORAGE_KEY = 'amchi_approvals_catalog';

export const approvalService = {
  getApprovals: () => {
    const stored = localStorage.getItem(APPROVALS_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(APPROVALS_STORAGE_KEY, JSON.stringify(mockApprovals));
      return mockApprovals;
    }
    return JSON.parse(stored);
  },

  getApprovalById: (id) => {
    const list = approvalService.getApprovals();
    return list.find((a) => a.id === id || a.code === id) || null;
  },

  createApproval: (approvalData) => {
    const list = approvalService.getApprovals();
    const newApproval = {
      id: `APP-TYPE-0${list.length + 1}`,
      ...approvalData
    };
    list.push(newApproval);
    localStorage.setItem(APPROVALS_STORAGE_KEY, JSON.stringify(list));
    return newApproval;
  },

  updateApproval: (id, updateData) => {
    const list = approvalService.getApprovals();
    const index = list.findIndex((a) => a.id === id);
    if (index !== -1) {
      list[index] = { ...list[index], ...updateData };
      localStorage.setItem(APPROVALS_STORAGE_KEY, JSON.stringify(list));
      return list[index];
    }
    return null;
  },

  deleteApproval: (id) => {
    let list = approvalService.getApprovals();
    list = list.filter((a) => a.id !== id);
    localStorage.setItem(APPROVALS_STORAGE_KEY, JSON.stringify(list));
    return true;
  }
};
