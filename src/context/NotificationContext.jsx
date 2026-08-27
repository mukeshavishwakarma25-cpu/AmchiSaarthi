import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { notificationService } from '../services/notificationService';
import { useAuth } from './AuthContext';

export const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const { user, role } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = useCallback(() => {
    if (!role) return;
    const list = notificationService.getNotifications(role, user?.id);
    setNotifications(list);
    setUnreadCount(list.filter((n) => !n.read).length);
  }, [role, user?.id]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const markAsRead = (id) => {
    notificationService.markAsRead(id);
    fetchNotifications();
  };

  const markAllAsRead = () => {
    notificationService.markAllAsRead(role);
    fetchNotifications();
  };

  const addNotification = (notif) => {
    notificationService.addNotification(notif);
    fetchNotifications();
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAsRead, markAllAsRead, addNotification, refresh: fetchNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider');
  return ctx;
};
