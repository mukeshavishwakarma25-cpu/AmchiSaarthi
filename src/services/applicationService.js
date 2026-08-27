import { initialMockApplications } from '../data/mockApplications';

const APPS_STORAGE_KEY = 'amchi_applications';

export const applicationService = {
  getApplications: () => {
    const stored = localStorage.getItem(APPS_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(initialMockApplications));
      return initialMockApplications;
    }
    return JSON.parse(stored);
  },

  getApplicationById: (id) => {
    const list = applicationService.getApplications();
    return list.find((a) => a.id === id) || null;
  },

  createApplication: (appData) => {
    const list = applicationService.getApplications();
    const newApp = {
      id: `APP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'SUBMITTED',
      priority: 'Normal',
      timeline: [
        {
          date: new Date().toLocaleString(),
          event: 'Application Submitted Online',
          actor: appData.applicantName || 'Entrepreneur'
        }
      ],
      aiSummary: {
        holderName: appData.businessName || 'Business Entity',
        certificateName: appData.title || 'License Clearance',
        certificateNumber: `MH-${Math.floor(10000 + Math.random() * 90000)}`,
        issueDate: new Date().toLocaleDateString(),
        issuingAuthority: appData.department || 'Government of Maharashtra'
      },
      aiFlags: [],
      ...appData
    };

    list.unshift(newApp);
    localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(list));
    return newApp;
  },

  updateApplicationStatus: (id, status, remarks = '', officerName = 'Review Officer') => {
    const list = applicationService.getApplications();
    const index = list.findIndex((a) => a.id === id);
    if (index !== -1) {
      const app = list[index];
      app.status = status;
      app.reviewRemarks = remarks;
      
      const timelineEvent = {
        date: new Date().toLocaleString(),
        event: status === 'APPROVED' ? 'Application Sanctioned & Approved' :
               status === 'ACTION_REQUIRED' ? `Correction Requested: ${remarks}` :
               status === 'REJECTED' ? `Application Rejected: ${remarks}` :
               `Status updated to ${status}`,
        actor: officerName
      };
      
      app.timeline = app.timeline || [];
      app.timeline.push(timelineEvent);

      list[index] = app;
      localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(list));
      return app;
    }
    return null;
  },

  resubmitApplication: (id, updatedDocs, applicantName = 'Entrepreneur') => {
    const list = applicationService.getApplications();
    const index = list.findIndex((a) => a.id === id);
    if (index !== -1) {
      const app = list[index];
      app.status = 'UNDER_REVIEW';
      app.correctionReason = '';
      if (updatedDocs) {
        app.documents = updatedDocs;
      }
      app.timeline.push({
        date: new Date().toLocaleString(),
        event: 'Correction Documents Resubmitted',
        actor: applicantName
      });
      list[index] = app;
      localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(list));
      return app;
    }
    return null;
  }
};
