import { applicationService } from './applicationService';
import { mockUsers } from '../data/mockUsers';

export const officerService = {
  getAssignedApplications: (officerId = 'OFF-202') => {
    const apps = applicationService.getApplications();
    // Return all or filtered by officer
    return apps.filter((a) => !a.assignedOfficerId || a.assignedOfficerId === officerId);
  },

  getStats: (officerId = 'OFF-202') => {
    const apps = officerService.getAssignedApplications(officerId);
    return {
      total: apps.length,
      pending: apps.filter((a) => a.status === 'UNDER_REVIEW' || a.status === 'SUBMITTED').length,
      actionRequired: apps.filter((a) => a.status === 'ACTION_REQUIRED').length,
      approved: apps.filter((a) => a.status === 'APPROVED').length,
      rejected: apps.filter((a) => a.status === 'REJECTED').length
    };
  },

  reviewApplication: (applicationId, decision, remarks, officerName) => {
    // decision: 'APPROVED' | 'ACTION_REQUIRED' | 'REJECTED'
    return applicationService.updateApplicationStatus(applicationId, decision, remarks, officerName);
  }
};
