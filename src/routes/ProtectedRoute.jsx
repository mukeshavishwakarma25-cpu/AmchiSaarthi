import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingState from '../components/state/LoadingState';

export default function ProtectedRoute({ allowedRoles = [] }) {
  const { user, loading, isAuthenticated, role } = useAuth();

  if (loading) {
    return <LoadingState message="Verifying session credentials..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/access-denied" replace />;
  }

  return <Outlet />;
}
