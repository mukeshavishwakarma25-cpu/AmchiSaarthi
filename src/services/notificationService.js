const NOTIF_STORAGE = 'amchi_notifications';

const initialNotifications = [
  {
    id: 'NOTIF-01',
    recipientRole: 'USER',
    userId: 'USR-101',
    title: 'Correction Requested: Factory Safety Approval',
    message: 'Officer Vikram Deshmukh requested updated architectural drawings with emergency egress dimensions.',
    date: '2023-10-02 04:30 PM',
    read: false,
    type: 'ACTION_REQUIRED',
    link: '/user/applications'
  },
  {
    id: 'NOTIF-02',
    recipientRole: 'USER',
    userId: 'USR-101',
    title: 'Water Connection Application Sanctioned',
    message: 'Your Industrial Water Utility Connection application (APP-2023-0712) has been approved!',
    date: '2023-08-20 11:30 AM',
    read: true,
    type: 'SUCCESS',
    link: '/user/applications'
  },
  {
    id: 'NOTIF-03',
    recipientRole: 'OFFICER',
    officerId: 'OFF-202',
    title: 'New Trade License Renewal Assigned',
    message: 'Application APP-2023-0891 from GreenTech Solutions Pvt Ltd assigned to your queue.',
    date: '2023-10-13 09:15 AM',
    read: false,
    type: 'INFO',
    link: '/officer/applications'
  },
  {
    id: 'NOTIF-04',
    recipientRole: 'ADMIN',
    title: 'System Audit: High Compliance Velocity',
    message: 'Pune district achieved 98.2% on-time approval resolution SLA this month.',
    date: '2026-08-26 10:00 AM',
    read: true,
    type: 'INFO',
    link: '/admin/audit-logs'
  }
];

export const notificationService = {
  getNotifications: (role = 'USER', userId = null) => {
    const stored = localStorage.getItem(NOTIF_STORAGE);
    let list = stored ? JSON.parse(stored) : initialNotifications;
    if (!stored) {
      localStorage.setItem(NOTIF_STORAGE, JSON.stringify(initialNotifications));
    }
    return list.filter((n) => n.recipientRole === role || (userId && n.userId === userId));
  },

  markAsRead: (id) => {
    const stored = localStorage.getItem(NOTIF_STORAGE);
    let list = stored ? JSON.parse(stored) : initialNotifications;
    const item = list.find((n) => n.id === id);
    if (item) {
      item.read = true;
      localStorage.setItem(NOTIF_STORAGE, JSON.stringify(list));
    }
    return list;
  },

  markAllAsRead: (role = 'USER') => {
    const stored = localStorage.getItem(NOTIF_STORAGE);
    let list = stored ? JSON.parse(stored) : initialNotifications;
    list.forEach((n) => {
      if (n.recipientRole === role) n.read = true;
    });
    localStorage.setItem(NOTIF_STORAGE, JSON.stringify(list));
    return list;
  },

  addNotification: (notif) => {
    const stored = localStorage.getItem(NOTIF_STORAGE);
    let list = stored ? JSON.parse(stored) : initialNotifications;
    const newNotif = {
      id: `NOTIF-${Date.now()}`,
      date: new Date().toLocaleString(),
      read: false,
      ...notif
    };
    list.unshift(newNotif);
    localStorage.setItem(NOTIF_STORAGE, JSON.stringify(list));
    return newNotif;
  }
};
