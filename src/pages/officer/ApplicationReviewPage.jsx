import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { applicationService } from '../../services/applicationService';
import { notificationService } from '../../services/notificationService';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import StatusBadge from '../../components/common/StatusBadge';
import AISummaryCard from '../../components/ai/AISummaryCard';
import IssueDetectionBanner from '../../components/ai/IssueDetectionBanner';
import './ApplicationReviewPage.css';

export default function ApplicationReviewPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const paramId = searchParams.get('id');

  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [remarks, setRemarks] = useState('');
  const [isCorrectionModalOpen, setIsCorrectionModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [checklist, setChecklist] = useState({
    identityVerified: true,
    feeReceiptConfirmed: true,
    drawingsCompliant: false,
    zoningValid: true
  });

  const loadData = () => {
    const list = applicationService.getApplications();
    setApplications(list);
    if (paramId) {
      const match = list.find((a) => a.id === paramId);
      if (match) setSelectedApp(match);
      else setSelectedApp(list[0]);
    } else if (list.length > 0) {
      setSelectedApp(list[0]);
    }
  };

  useEffect(() => {
    loadData();
  }, [paramId]);

  const handleApprove = () => {
    if (!selectedApp) return;
    if (window.confirm(`Sanction and issue approval for ${selectedApp.id}?`)) {
      applicationService.updateApplicationStatus(
        selectedApp.id,
        'APPROVED',
        remarks || 'All statutory parameters and technical drawings verified.',
        user?.name || 'Vikram Deshmukh'
      );
      notificationService.addNotification({
        recipientRole: 'USER',
        title: `Approval Sanctioned: ${selectedApp.title}`,
        message: `Your application (${selectedApp.id}) has been formally approved by ${user?.name || 'Review Officer'}.`,
        type: 'SUCCESS'
      });
      loadData();
    }
  };

  const handleRequestCorrection = (e) => {
    e.preventDefault();
    if (!selectedApp || !remarks.trim()) return;

    applicationService.updateApplicationStatus(
      selectedApp.id,
      'ACTION_REQUIRED',
      remarks,
      user?.name || 'Vikram Deshmukh'
    );
    notificationService.addNotification({
      recipientRole: 'USER',
      title: `Correction Requested: ${selectedApp.title}`,
      message: remarks,
      type: 'ACTION_REQUIRED'
    });
    setIsCorrectionModalOpen(false);
    loadData();
  };

  const handleReject = (e) => {
    e.preventDefault();
    if (!selectedApp || !remarks.trim()) return;

    applicationService.updateApplicationStatus(
      selectedApp.id,
      'REJECTED',
      remarks,
      user?.name || 'Vikram Deshmukh'
    );
    notificationService.addNotification({
      recipientRole: 'USER',
      title: `Application Rejected: ${selectedApp.title}`,
      message: remarks,
      type: 'ERROR'
    });
    setIsRejectModalOpen(false);
    loadData();
  };

  return (
    <div className="officer-review-page">
      {/* Left Column: Applications Queue */}
      <div className="review-sidebar-queue">
        <h3 className="queue-title">Assigned Queue ({applications.length})</h3>
        <div className="queue-list">
          {applications.map((app) => {
            const isSelected = selectedApp?.id === app.id;
            return (
              <div
                key={app.id}
                className={`queue-item ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedApp(app)}
              >
                <div className="queue-item-header">
                  <span className="queue-item-id">{app.id}</span>
                  <StatusBadge status={app.status} />
                </div>
                <h4 className="queue-item-title">{app.title}</h4>
                <p className="queue-item-biz">{app.businessName}</p>
                <div className="queue-item-meta">
                  <span>{app.submittedDate}</span>
                  <span>{app.feePaid}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: Review Canvas */}
      {selectedApp ? (
        <div className="review-canvas">
          <div className="canvas-header-card">
            <div className="canvas-header-top">
              <div>
                <span className="canvas-app-id">{selectedApp.id}</span>
                <h2 className="canvas-title">{selectedApp.title}</h2>
                <p className="canvas-sub">
                  Applicant: <strong>{selectedApp.applicantName}</strong> ({selectedApp.businessName}) • {selectedApp.department}
                </p>
              </div>
              <StatusBadge status={selectedApp.status} />
            </div>

            <div className="canvas-info-pills">
              <div className="info-pill">
                <span className="pill-lbl">Filing Date</span>
                <span className="pill-val">{selectedApp.submittedDate}</span>
              </div>
              <div className="info-pill">
                <span className="pill-lbl">Statutory Fee</span>
                <span className="pill-val">{selectedApp.feePaid}</span>
              </div>
              <div className="info-pill">
                <span className="pill-lbl">SLA Deadline</span>
                <span className="pill-val">7 Days Remaining</span>
              </div>
            </div>
          </div>

          {/* AI Extracted Metadata */}
          {selectedApp.aiSummary && <AISummaryCard summary={selectedApp.aiSummary} />}

          {/* AI Issue Detection Flags */}
          {selectedApp.aiFlags && <IssueDetectionBanner flags={selectedApp.aiFlags} />}

          {/* Document Verification Section */}
          <Card title="Submitted Technical Documents & Drawings">
            <div className="review-docs-list">
              {(selectedApp.documents || []).map((doc, idx) => (
                <div key={idx} className="review-doc-row">
                  <span className="material-symbols-outlined doc-icon">description</span>
                  <div className="doc-detail-col">
                    <span className="doc-name">{doc.name}</span>
                    <span className="doc-type">{doc.type}</span>
                  </div>
                  <span className="doc-status-badge">{doc.status}</span>
                  <Button variant="outline" size="sm" icon="open_in_new">
                    Inspect PDF
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Statutory Verification Checklist */}
          <Card title="Officer Statutory Verification Checklist">
            <div className="checklist-container">
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={checklist.identityVerified}
                  onChange={(e) => setChecklist({ ...checklist, identityVerified: e.target.checked })}
                />
                <span>Applicant Identity & Enterprise PAN/GSTIN Verified</span>
              </label>

              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={checklist.feeReceiptConfirmed}
                  onChange={(e) => setChecklist({ ...checklist, feeReceiptConfirmed: e.target.checked })}
                />
                <span>Treasury Challan / Single-Window Fee Receipt Authenticated</span>
              </label>

              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={checklist.drawingsCompliant}
                  onChange={(e) => setChecklist({ ...checklist, drawingsCompliant: e.target.checked })}
                />
                <span>Technical Drawings match Maharashtra Municipal & Factory Act specifications</span>
              </label>

              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={checklist.zoningValid}
                  onChange={(e) => setChecklist({ ...checklist, zoningValid: e.target.checked })}
                />
                <span>Industrial Zone / MIDC Land Allocation Certificate Valid</span>
              </label>
            </div>
          </Card>

          {/* Officer Decision Bar */}
          <div className="officer-decision-bar">
            <div className="decision-actions">
              <Button
                variant="danger"
                icon="close"
                onClick={() => setIsRejectModalOpen(true)}
              >
                Reject Application
              </Button>
              <Button
                variant="secondary"
                icon="report_problem"
                onClick={() => setIsCorrectionModalOpen(true)}
              >
                Request Correction
              </Button>
              <Button
                variant="success"
                icon="verified"
                size="lg"
                onClick={handleApprove}
              >
                Approve & Grant Sanction
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="review-canvas empty-canvas">
          <p>Select an application from the queue to start reviewing.</p>
        </div>
      )}

      {/* Correction Modal */}
      <Modal
        isOpen={isCorrectionModalOpen}
        onClose={() => setIsCorrectionModalOpen(false)}
        title="Request Correction from Applicant"
      >
        <form onSubmit={handleRequestCorrection}>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Specify the precise statutory deficiencies or missing document attachments that the applicant must rectify.
          </p>

          <Input
            label="Correction Instructions for Applicant"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="e.g. Architectural elevation plan lacks emergency egress stairwell dimensions as per Section 38 of Factories Act."
            required
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
            <Button variant="ghost" onClick={() => setIsCorrectionModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="danger" icon="send">
              Send Correction Request
            </Button>
          </div>
        </form>
      </Modal>

      {/* Reject Modal */}
      <Modal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        title="Reject Statutory Clearance Application"
      >
        <form onSubmit={handleReject}>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-error)', marginBottom: '16px' }}>
            ⚠️ Rejection is a formal statutory order. Please cite the applicable section of the Act.
          </p>

          <Input
            label="Statutory Grounds for Rejection"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="e.g. Establishment lies within prohibited eco-sensitive river basin zone under MPCB notifications."
            required
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
            <Button variant="ghost" onClick={() => setIsRejectModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="danger" icon="block">
              Confirm Statutory Rejection
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
