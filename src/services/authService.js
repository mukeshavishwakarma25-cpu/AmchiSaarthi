import { mockUsers } from '../data/mockUsers';

// Local storage key for persistent mock users & session
const USERS_STORAGE_KEY = 'amchi_users';
const CURRENT_USER_KEY = 'amchi_current_user';

export const authService = {
  getUsers: () => {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(mockUsers));
      return mockUsers;
    }
    return JSON.parse(stored);
  },

  getCurrentUser: () => {
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // Default to Entrepreneur demo user
    const defaultUser = mockUsers[0];
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(defaultUser));
    return defaultUser;
  },

  login: async (email, password) => {
    await new Promise((res) => setTimeout(res, 400));
    const users = authService.getUsers();
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      return { success: true, user };
    }
    // For demo convenience, allow logging in with any email
    const fallbackUser = {
      id: `USR-${Date.now().toString().slice(-4)}`,
      name: email.split('@')[0],
      email,
      role: 'USER',
      designation: 'Entrepreneur',
      businessId: 'BIZ-201',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
    };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(fallbackUser));
    return { success: true, user: fallbackUser };
  },

  register: async ({ name, email, password, businessName, mobile }) => {
    await new Promise((res) => setTimeout(res, 500));
    const users = authService.getUsers();
    
    // Normal registration strictly creates USER role
    const newUser = {
      id: `USR-${Date.now().toString().slice(-4)}`,
      name,
      email,
      role: 'USER',
      designation: 'MSME Entrepreneur',
      mobile,
      businessName,
      businessId: `BIZ-${Date.now().toString().slice(-4)}`,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
    };

    users.push(newUser);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    return { success: true, user: newUser };
  },

  switchRole: (role) => {
    const users = authService.getUsers();
    const target = users.find((u) => u.role === role) || users[0];
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(target));
    return target;
  },

  logout: () => {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};
