import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

const statusClasses = {
  DRAFT: 'status-draft',
  SUBMITTED: 'status-submitted',
  UNDER_REVIEW: 'status-under-review',
  ACTION_REQUIRED: 'status-action-required',
  APPROVED: 'status-approved',
  REJECTED: 'status-rejected',
  ACTIVE: 'status-approved',
  EXPIRING_SOON: 'status-action-required',
  EXPIRED: 'status-rejected',
  PENDING: 'status-submitted',
};

const statusIcons = {
  DRAFT: 'edit_note',
  SUBMITTED: 'send',
  UNDER_REVIEW: 'hourglass_top',
  ACTION_REQUIRED: 'warning',
  APPROVED: 'check_circle',
  REJECTED: 'cancel',
  ACTIVE: 'verified',
  EXPIRING_SOON: 'timer',
  EXPIRED: 'event_busy',
  PENDING: 'schedule',
};

export default function StatusBadge({ status }) {
  const { t } = useLanguage();
  const cssClass = statusClasses[status] || 'status-draft';
  const icon = statusIcons[status] || 'info';
  const label = t(`status.${status}`) || status;

  return (
    <span className={`status-pill ${cssClass}`}>
      <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>{icon}</span>
      {label}
    </span>
  );
}
