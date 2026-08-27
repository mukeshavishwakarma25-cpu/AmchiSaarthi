import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { documentService } from '../../services/documentService';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import StatusBadge from '../../components/common/StatusBadge';
import './DocumentVaultPage.css';

export default function DocumentVaultPage() {
  const { t } = useLanguage();
  const [documents, setDocuments] = useState([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState(null);

  const [uploadForm, setUploadForm] = useState({
    name: '',
    category: 'Commercial Licenses',
    type: 'Trade License',
    expiryDate: '2027-03-31',
    size: '1.8 MB'
  });

  const loadDocuments = () => {
    setDocuments(documentService.getDocuments());
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const handleUpload = (e) => {
    e.preventDefault();
    documentService.uploadDocument(uploadForm);
    setIsUploadModalOpen(false);
    loadDocuments();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this document from the vault?')) {
      documentService.deleteDocument(id);
      loadDocuments();
    }
  };

  return (
    <div className="document-vault-page">
      <div className="vault-header-row">
        <div>
          <h1 className="page-title">{t('nav.documents')}</h1>
          <p className="page-subtitle">
            Securely manage, preview, and auto-populate verified compliance certificates across all Maharashtra single-window filings.
          </p>
        </div>
        <Button variant="primary" icon="upload_file" onClick={() => setIsUploadModalOpen(true)}>
          Upload Certificate
        </Button>
      </div>

      {/* Expiry Alert banner */}
      {documents.some((d) => d.status === 'EXPIRING_SOON' || d.status === 'EXPIRED') && (
        <div className="vault-expiry-strip">
          <span className="material-symbols-outlined">alarm</span>
          <div className="expiry-strip-text">
            <strong>Document Expiry Warning:</strong> Fire Safety Inspection Report and Building Structural Stability Report require renewal.
          </div>
        </div>
      )}

      {/* Documents Grid */}
      <div className="vault-docs-grid">
        {documents.map((doc) => (
          <Card key={doc.id} className="vault-doc-card">
            <div className="doc-card-top">
              <div className="doc-icon-wrap">
                <span className="material-symbols-outlined">picture_as_pdf</span>
              </div>
              <StatusBadge status={doc.status} />
            </div>

            <div className="doc-card-main">
              <h4 className="doc-title">{doc.name}</h4>
              <p className="doc-cat">{doc.category} • {doc.type}</p>
            </div>

            <div className="doc-card-meta">
              <div>
                <span className="meta-lbl">Uploaded</span>
                <span className="meta-val">{doc.uploadDate}</span>
              </div>
              <div>
                <span className="meta-lbl">Expiry Date</span>
                <span className="meta-val">{doc.expiryDate}</span>
              </div>
              <div>
                <span className="meta-lbl">Size</span>
                <span className="meta-val">{doc.size}</span>
              </div>
            </div>

            <div className="doc-card-actions">
              <Button
                variant="outline"
                size="sm"
                icon="visibility"
                onClick={() => setPreviewDoc(doc)}
              >
                Inspect
              </Button>
              <Button
                variant="ghost"
                size="sm"
                icon="delete"
                onClick={() => handleDelete(doc.id)}
              >
                Remove
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Preview Modal */}
      {previewDoc && (
        <Modal
          isOpen={!!previewDoc}
          onClose={() => setPreviewDoc(null)}
          title={`Document Preview: ${previewDoc.name}`}
          maxWidth="640px"
        >
          <div className="preview-modal-body">
            <div className="preview-mock-canvas">
              <span className="material-symbols-outlined canvas-icon">verified_user</span>
              <h3>Official Government Certificate Scan</h3>
              <p>{previewDoc.name}</p>
              <div className="canvas-meta">
                <span>Category: <strong>{previewDoc.category}</strong></span>
                <span>Expiry: <strong>{previewDoc.expiryDate}</strong></span>
                <span>Status: <strong>{previewDoc.status}</strong></span>
              </div>
            </div>

            <div className="preview-modal-footer-btns">
              <Button variant="outline" icon="download" onClick={() => window.open(previewDoc.fileUrl, '_blank')}>
                Download Original PDF
              </Button>
              <Button variant="primary" onClick={() => setPreviewDoc(null)}>
                Done
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Upload Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Upload Statutory Certificate to Vault"
      >
        <form onSubmit={handleUpload} className="vault-upload-form">
          <Input
            label="Document Title (e.g. Factory Floor Plan 2026.pdf)"
            required
            value={uploadForm.name}
            onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
            placeholder="Municipal Trade License 2026.pdf"
          />

          <div className="input-group">
            <label className="input-label">Category</label>
            <select
              className="input-field"
              value={uploadForm.category}
              onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
            >
              <option value="Commercial Licenses">Commercial Licenses</option>
              <option value="Safety & Environment">Safety & Environment</option>
              <option value="Infrastructure & Site">Infrastructure & Site</option>
              <option value="Taxation & Revenue">Taxation & Revenue</option>
              <option value="Labour & Welfare">Labour & Welfare</option>
            </select>
          </div>

          <Input
            label="Expiry Date (if applicable)"
            type="date"
            value={uploadForm.expiryDate}
            onChange={(e) => setUploadForm({ ...uploadForm, expiryDate: e.target.value })}
          />

          <div className="file-upload-dropzone">
            <span className="material-symbols-outlined upload-icon">cloud_upload</span>
            <p>Select PDF or Image from device</p>
            <span className="upload-limit">Maximum size: 25MB • Signed Digital PDFs supported</span>
          </div>

          <div className="modal-form-actions">
            <Button variant="ghost" onClick={() => setIsUploadModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" icon="check">
              Save to Secure Vault
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
