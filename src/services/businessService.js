import { mockBusinesses } from '../data/mockBusinesses';
import { mockApprovals } from '../data/mockApprovals';

const BIZ_STORAGE_KEY = 'amchi_businesses';

export const businessService = {
  getBusinesses: () => {
    const stored = localStorage.getItem(BIZ_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(BIZ_STORAGE_KEY, JSON.stringify(mockBusinesses));
      return mockBusinesses;
    }
    return JSON.parse(stored);
  },

  getBusinessById: (id) => {
    const list = businessService.getBusinesses();
    return list.find((b) => b.id === id) || list[0];
  },

  updateBusiness: (id, updatedFields) => {
    const list = businessService.getBusinesses();
    const index = list.findIndex((b) => b.id === id);
    if (index !== -1) {
      list[index] = { ...list[index], ...updatedFields, updatedAt: new Date().toISOString() };
      localStorage.setItem(BIZ_STORAGE_KEY, JSON.stringify(list));
      return list[index];
    }
    return null;
  },

  computeApplicableRoadmap: (business) => {
    const allApprovals = mockApprovals;
    // Compute applicable approvals based on business type, scale, category, employees
    const matched = allApprovals.filter((app) => {
      // General match logic
      if (app.isUniversal) return true;
      if (business.category === 'Food Processing' && app.sector === 'Food') return true;
      if (business.category === 'Manufacturing' && (app.sector === 'Industrial' || app.sector === 'Environment')) return true;
      if (business.category === 'IT & Services' && app.sector === 'Commercial') return true;
      if (business.employees > 10 && app.id === 'APP-TYPE-02') return true; // Factory Act
      return app.category === business.category || app.sector === 'General';
    });

    // Group into phased roadmap: Phase 1: Pre-Establishment, Phase 2: Construction/Setup, Phase 3: Pre-Operation, Phase 4: Regular
    return {
      phases: [
        {
          id: 'phase-1',
          name: 'Pre-Establishment Clearances',
          description: 'Entity registration, land use zoning, and core identity approvals.',
          approvals: matched.slice(0, 2)
        },
        {
          id: 'phase-2',
          name: 'Setup & Infrastructure Sanctions',
          description: 'Factory floor layout, fire safety NOC, and utility connections.',
          approvals: matched.slice(2, 4)
        },
        {
          id: 'phase-3',
          name: 'Pre-Operation & Environmental Consents',
          description: 'Pollution control consent, food safety licensing, and labour inspections.',
          approvals: matched.slice(4)
        }
      ]
    };
  }
};
