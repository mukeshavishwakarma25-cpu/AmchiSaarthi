import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import UserLayout from '../layouts/UserLayout';
import OfficerLayout from '../layouts/OfficerLayout';
import AdminLayout from '../layouts/AdminLayout';

// Public Pages
import HomePage from '../pages/public/HomePage';
import HowItWorksPage from '../pages/public/HowItWorksPage';
import FeaturesPage from '../pages/public/FeaturesPage';
import AboutPage from '../pages/public/AboutPage';
import LoginPage from '../pages/public/LoginPage';
import RegisterPage from '../pages/public/RegisterPage';

// User Pages
import UserDashboard from '../pages/user/UserDashboard';
import BusinessProfilePage from '../pages/user/BusinessProfilePage';
import RoadmapPage from '../pages/user/RoadmapPage';
import ApplicationsPage from '../pages/user/ApplicationsPage';
import DocumentVaultPage from '../pages/user/DocumentVaultPage';
import AIAssistantPage from '../pages/user/AIAssistantPage';
import UserNotificationsPage from '../pages/user/UserNotificationsPage';
import UserProfilePage from '../pages/user/UserProfilePage';

// Officer Pages
import OfficerDashboard from '../pages/officer/OfficerDashboard';
import ApplicationReviewPage from '../pages/officer/ApplicationReviewPage';
import OfficerNotificationsPage from '../pages/officer/OfficerNotificationsPage';
import OfficerProfilePage from '../pages/officer/OfficerProfilePage';

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminUsersPage from '../pages/admin/AdminUsersPage';
import AdminOfficersPage from '../pages/admin/AdminOfficersPage';
import AdminDepartmentsPage from '../pages/admin/AdminDepartmentsPage';
import AdminApprovalsPage from '../pages/admin/AdminApprovalsPage';
import AdminRequirementsPage from '../pages/admin/AdminRequirementsPage';
import AdminRulesPage from '../pages/admin/AdminRulesPage';
import AdminKnowledgeBasePage from '../pages/admin/AdminKnowledgeBasePage';
import AdminAuditLogsPage from '../pages/admin/AdminAuditLogsPage';
import AdminProfilePage from '../pages/admin/AdminProfilePage';

// Error Pages
import NotFoundPage from '../pages/errors/NotFoundPage';
import AccessDeniedPage from '../pages/errors/AccessDeniedPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/access-denied" element={<AccessDeniedPage />} />
      </Route>

      {/* User / Entrepreneur Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['USER']} />}>
        <Route element={<UserLayout />}>
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/profile" element={<UserProfilePage />} />
          <Route path="/user/business" element={<BusinessProfilePage />} />
          <Route path="/user/roadmap" element={<RoadmapPage />} />
          <Route path="/user/applications" element={<ApplicationsPage />} />
          <Route path="/user/documents" element={<DocumentVaultPage />} />
          <Route path="/user/assistant" element={<AIAssistantPage />} />
          <Route path="/user/notifications" element={<UserNotificationsPage />} />
        </Route>
      </Route>

      {/* Officer Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['OFFICER']} />}>
        <Route element={<OfficerLayout />}>
          <Route path="/officer/dashboard" element={<OfficerDashboard />} />
          <Route path="/officer/applications" element={<ApplicationReviewPage />} />
          <Route path="/officer/notifications" element={<OfficerNotificationsPage />} />
          <Route path="/officer/profile" element={<OfficerProfilePage />} />
        </Route>
      </Route>

      {/* Admin Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'SUPER_ADMIN']} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/officers" element={<AdminOfficersPage />} />
          <Route path="/admin/departments" element={<AdminDepartmentsPage />} />
          <Route path="/admin/approvals" element={<AdminApprovalsPage />} />
          <Route path="/admin/requirements" element={<AdminRequirementsPage />} />
          <Route path="/admin/rules" element={<AdminRulesPage />} />
          <Route path="/admin/knowledge-base" element={<AdminKnowledgeBasePage />} />
          <Route path="/admin/audit-logs" element={<AdminAuditLogsPage />} />
          <Route path="/admin/notifications" element={<OfficerNotificationsPage />} />
          <Route path="/admin/profile" element={<AdminProfilePage />} />
        </Route>
      </Route>

      {/* 404 Catch All */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
