import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { applicationService } from '../../services/applicationService';
import { approvalService } from '../../services/approvalService';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import StatusBadge from '../../components/common/StatusBadge';
import AISummaryCard from '../../components/ai/AISummaryCard';
import IssueDetectionBanner from '../../components/ai/IssueDetectionBanner';
import './ApplicationsPage.css';

export default function ApplicationsPage() {
  const { t } = useLanguage();
  const [applications, setApplications] = useState([]);
  const [approvalsList, setApprovalsList] = useState([]);
  const [activeTab, setActiveTab] = useState('ALL');
  const [selectedApp, setSelectedApp] = useState(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isCorrectionModalOpen, setIsCorrectionModalOpen] = useState(false);
  const [correctionNote, setCorrectionNote] = useState('');

  const [newForm, setNewForm] = useState({
    approvalId: 'APP-TYPE-01',
    title: 'Municipal Trade License & Renewal',
    department: 'Urban Development & Municipal Corporation',
    feePaid: '₹ 4,500',
    applicantName: 'Rajesh Kumar',
    businessName: 'GreenTech Solutions Pvt Ltd'
  });

  const loadData = () => {
    setApplications(applicationService.getApplications());
    setApprovalsList(approvalService.getApprovals());
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredApps = applications.filter((app) => {
    if (activeTab === 'ALL') return true;
    if (activeTab === 'ACTION') return app.status === 'ACTION_REQUIRED';
    if (activeTab === 'REVIEW') return app.status === 'UNDER_REVIEW' || app.status === 'SUBMITTED';
    if (activeTab === 'APPROVED') return app.status === 'APPROVED';
    return true;
  });

  const handleCreateApplication = (e) => {
    e.preventDefault();
    applicationService.createApplication({
      ...newForm,
      documents: [
        { id: `DOC-${Date.now().toString().slice(-4)}`, name: 'Premises Agreement.pdf', status: 'VALID', type: 'Proof' },
        { id: `DOC-${Date.now().toString().slice(-3)}`, name: 'Identity Proof.pdf', status: 'VALID', type: 'ID' }
      ]
    });
    setIsNewModalOpen(false);
    loadData();
  };

  const handleResubmitCorrection = (e) => {
    e.preventDefault();
    if (!selectedApp) return;

    applicationService.resubmitApplication(selectedApp.id, [
      { id: 'DOC-9011-REV2', name: 'Establishment Floor Plan (Corrected).pdf', status: 'VALID', type: 'Site Plan' },
      { id: 'DOC-7741', name: 'Fire Safety Inspection Report.pdf', status: 'VALID', type: 'Safety Inspection' }
    ]);

    setIsCorrectionModalOpen(false);
    loadData();
    const updated = applicationService.getApplicationById(selectedApp.id);
    setSelectedApp(updated);
  };

  return (
    <div className="applications-page">
      <div className="apps-header-row">
        <div>
          <h1 className="page-title">{t('nav.applications')}</h1>
          <p className="page-subtitle">
            Track and manage your single-window statutory filings across Maharashtra government departments.
          </p>
        </div>
        <Button variant="primary" icon="add" onClick={() => setIsNewModalOpen(true)}>
          New Application
        </Button>
      </div>

      {/* Tabs Filter */}
      <div className="apps-tabs-row">
        <button
          className={`app-filter-tab ${activeTab === 'ALL' ? 'active' : ''}`}
          onClick={() => setActiveTab('ALL')}
        >
          All Applications ({applications.length})
        </button>
        <button
          className={`app-filter-tab ${activeTab === 'ACTION' ? 'active' : ''}`}
          onClick={() => setActiveTab('ACTION')}
        >
          Action Required ({applications.filter((a) => a.status === 'ACTION_REQUIRED').length})
        </button>
        <button
          className={`app-filter-tab ${activeTab === 'REVIEW' ? 'active' : ''}`}
          onClick={() => setActiveTab('REVIEW')}
        >
          Under Review ({applications.filter((a) => a.status === 'UNDER_REVIEW' || a.status === 'SUBMITTED').length})
        </button>
        <button
          className={`app-filter-tab ${activeTab === 'APPROVED' ? 'active' : ''}`}
          onClick={() => setActiveTab('APPROVED')}
        >
          Approved ({applications.filter((a) => a.status === 'APPROVED').length})
        </button>
      </div>

      {/* Applications List */}
      <div className="apps-list-grid">
        {filteredApps.map((app) => (
          <Card key={app.id} className="app-card-item">
            <div className="app-card-top">
              <div>
                <span className="app-id-tag">{app.id}</span>
                <h3 className="app-title-text">{app.title}</h3>
                <p className="app-dept-text">
                  <span className="material-symbols-outlined">domain</span>
                  {app.department}
                </p>
              </div>
              <StatusBadge status={app.status} />
            </div>

            {app.status === 'ACTION_REQUIRED' && app.correctionReason && (
              <div className="app-correction-alert">
                <span className="material-symbols-outlined">warning</span>
                <div>
                  <strong>Correction Reason:</strong> {app.correctionReason}
                </div>
              </div>
            )}

            <div className="app-card-meta">
              <span>Submitted: <strong>{app.submittedDate}</strong></span>
              <span>Officer: <strong>{app.assignedOfficer || 'Auto-Routing'}</strong></span>
              <span>Fee: <strong>{app.feePaid}</strong></span>
            </div>

            <div className="app-card-footer">
              <Button
                variant="outline"
                size="sm"
                icon="visibility"
                onClick={() => setSelectedApp(app)}
              >
                Inspect Details & Timeline
              </Button>

              {app.status === 'ACTION_REQUIRED' && (
                <Button
                  variant="danger"
                  size="sm"
                  icon="edit_document"
                  onClick={() => {
                    setSelectedApp(app);
                    setIsCorrectionModalOpen(true);
                  }}
                >
                  Resubmit Correction
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Application Detail Modal */}
      {selectedApp && (
        <Modal
          isOpen={!!selectedApp && !isCorrectionModalOpen}
          onClose={() => setSelectedApp(null)}
          title={`Application Details - ${selectedApp.id}`}
          maxWidth="720px"
        >
          <div className="app-detail-modal-body">
            <div className="app-detail-top-strip">
              <div>
                <h2>{selectedApp.title}</h2>
                <p className="detail-dept">{selectedApp.department}</p>
              </div>
              <StatusBadge status={selectedApp.status} />
            </div>

            {selectedApp.aiSummary && <AISummaryCard summary={selectedApp.aiSummary} />}
            {selectedApp.aiFlags && <IssueDetectionBanner flags={selectedApp.aiFlags} />}

            {selectedApp.correctionReason && (
              <div className="modal-correction-box">
                <span className="material-symbols-outlined">error</span>
                <div>
                  <h4>Officer Correction Request</h4>
                  <p>{selectedApp.correctionReason}</p>
                </div>
              </div>
            )}

            {/* Submitted Documents Section */}
            <div className="modal-docs-section">
              <h4>Submitted Documents</h4>
              <div className="modal-docs-list">
                {(selectedApp.documents || []).map((doc, idx) => (
                  <div key={idx} className="modal-doc-row">
                    <span className="material-symbols-outlined">description</span>
                    <div className="doc-info-col">
                      <span className="doc-name">{doc.name}</span>
                      <span className="doc-type">{doc.type}</span>
                    </div>
                    <span className="doc-status-chip">{doc.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline Section */}
            <div className="modal-timeline-section">
              <h4>Statutory Application Timeline</h4>
              <div className="timeline-trail">
                {(selectedApp.timeline || []).map((ev, evIdx) => (
                  <div key={evIdx} className="timeline-node">
                    <div className="node-dot"></div>
                    <div className="node-body">
                      <p className="node-event">{ev.event}</p>
                      <p className="node-meta">
                        {ev.date} • Actor: <strong>{ev.actor}</strong>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Resubmit Correction Modal */}
      {selectedApp && (
        <Modal
          isOpen={isCorrectionModalOpen}
          onClose={() => setIsCorrectionModalOpen(false)}
          title={`Upload Corrected Documents - ${selectedApp.id}`}
        >
          <form onSubmit={handleResubmitCorrection} className="correction-modal-form">
            <div className="correction-notice">
              <p>
                <strong>Officer Vikram Deshmukh's Requirement:</strong> {selectedApp.correctionReason}
              </p>
            </div>

            <div className="file-upload-dropzone">
              <span className="material-symbols-outlined upload-icon">cloud_upload</span>
              <p>Drag & Drop updated PDF drawing or browse computer</p>
              <span className="upload-limit">Max size 25MB • Formats: PDF, DWG</span>
            </div>

            <Input
              label="Applicant Correction Remarks"
              placeholder="e.g. Attached revised elevation drawings with 2.0m emergency exit stairwell width."
              value={correctionNote}
              onChange={(e) => setCorrectionNote(e.target.value)}
            />

            <div className="modal-form-actions">
              <Button variant="ghost" onClick={() => setIsCorrectionModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" icon="send">
                Resubmit to Review Officer
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* New Application Modal */}
      <Modal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        title="Submit New Statutory Clearance Application"
      >
        <form onSubmit={handleCreateApplication} className="new-app-form">
          <div className="input-group">
            <label className="input-label">Select Approval Type</label>
            <select
              className="input-field"
              value={newForm.approvalId}
              onChange={(e) => {
                const app = approvalsList.find((a) => a.id === e.target.value);
                setNewForm({
                  ...newForm,
                  approvalId: e.target.value,
                  title: app ? app.name : newForm.title,
                  department: app ? app.departmentName : newForm.department,
                  feePaid: app ? app.fee : '₹ 5,000'
                });
              }}
            >
              {approvalsList.map((app) => (
                <option key={app.id} value={app.id}>
                  {app.name} ({app.fee})
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Applicant Full Name"
            value={newForm.applicantName}
            onChange={(e) => setNewForm({ ...newForm, applicantName: e.target.value })}
            required
          />

          <Input
            label="Registered Enterprise Name"
            value={newForm.businessName}
            onChange={(e) => setNewForm({ ...newForm, businessName: e.target.value })}
            required
          />

          <div className="modal-form-actions">
            <Button variant="ghost" onClick={() => setIsNewModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" icon="check_circle">
              Confirm & Submit Application
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
