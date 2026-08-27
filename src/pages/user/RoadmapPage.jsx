import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import { businessService } from '../../services/businessService';
import { approvalService } from '../../services/approvalService';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/common/StatusBadge';
import './RoadmapPage.css';

export default function RoadmapPage() {
  const { t } = useLanguage();
  const [roadmap, setRoadmap] = useState(null);
  const [business, setBusiness] = useState(null);

  useEffect(() => {
    const biz = businessService.getBusinessById('BIZ-201');
    setBusiness(biz);
    if (biz) {
      const computed = businessService.computeApplicableRoadmap(biz);
      setRoadmap(computed);
    }
  }, []);

  const phases = [
    {
      id: 'phase-1',
      title: 'Phase 1: Pre-Establishment Clearances',
      stageDesc: 'Statutory approvals required prior to any civil construction or machinery foundation work.',
      approvals: [
        {
          id: 'APP-TYPE-02',
          name: 'Factory Building Plan & Safety Approval',
          department: 'Industry, Energy & Labour Department',
          sla: '15 Days',
          fee: '₹ 8,000',
          status: 'ACTION_REQUIRED',
          statusText: 'Action Required',
          requiredDocs: ['Site Elevation Plan', 'Structural Stability Certificate', 'Machinery Layout']
        },
        {
          id: 'APP-TYPE-03',
          name: 'Consent to Establish (CTE) - Orange Category',
          department: 'Maharashtra Pollution Control Board (MPCB)',
          sla: '21 Days',
          fee: '₹ 15,000',
          status: 'DRAFT',
          statusText: 'Not Started',
          requiredDocs: ['Effluent Treatment Plant Scheme', 'Water Balance Chart', 'Project DPR']
        }
      ]
    },
    {
      id: 'phase-2',
      title: 'Phase 2: Setup & Construction Sanctions',
      stageDesc: 'On-site safety verifications, provisional clearances, and utility trunk line connections.',
      approvals: [
        {
          id: 'APP-TYPE-04',
          name: 'Fire Safety Clearance / Provisional NOC',
          department: 'Fire & Emergency Services Directorate',
          sla: '10 Days',
          fee: '₹ 6,000',
          status: 'DRAFT',
          statusText: 'Not Started',
          requiredDocs: ['Hydrant Layout', 'Emergency Evacuation Map']
        },
        {
          id: 'APP-TYPE-05',
          name: 'Industrial Water Utility Connection',
          department: 'Urban Development & Municipal Corporation',
          sla: '5 Days',
          fee: '₹ 3,200',
          status: 'APPROVED',
          statusText: 'Approved',
          requiredDocs: ['Plumbing Schematic', 'Sanctioned Building Plan']
        }
      ]
    },
    {
      id: 'phase-3',
      title: 'Phase 3: Pre-Operation Clearances',
      stageDesc: 'Final operational licenses, municipal registrations, and commercial launch permissions.',
      approvals: [
        {
          id: 'APP-TYPE-01',
          name: 'Municipal Trade License & Renewal',
          department: 'Urban Development & Municipal Corporation',
          sla: '7 Days',
          fee: '₹ 4,500',
          status: 'UNDER_REVIEW',
          statusText: 'Under Review',
          requiredDocs: ['Premises Rent Agreement', 'Property Tax Receipt', 'Site Floor Plan']
        }
      ]
    }
  ];

  return (
    <div className="roadmap-page">
      <div className="roadmap-header">
        <div>
          <span className="roadmap-badge">
            <span className="material-symbols-outlined">auto_awesome</span>
            AI-Computed Roadmap for {business?.name || 'GreenTech Solutions Pvt Ltd'}
          </span>
          <h1 className="page-title">{t('nav.roadmap')}</h1>
          <p className="page-subtitle">
            A sequenced, phase-by-phase statutory compliance pipeline tailored to your sector (Manufacturing), scale, and location.
          </p>
        </div>
      </div>

      <div className="roadmap-timeline-container">
        {phases.map((phase, pIdx) => (
          <div key={phase.id} className="phase-card">
            <div className="phase-header">
              <div className="phase-number-badge">{pIdx + 1}</div>
              <div className="phase-header-info">
                <h3 className="phase-title">{phase.title}</h3>
                <p className="phase-desc">{phase.stageDesc}</p>
              </div>
            </div>

            <div className="phase-approvals-grid">
              {phase.approvals.map((app) => (
                <div key={app.id} className="roadmap-app-card">
                  <div className="roadmap-app-header">
                    <h4 className="roadmap-app-title">{app.name}</h4>
                    <StatusBadge status={app.status} />
                  </div>

                  <p className="roadmap-app-dept">
                    <span className="material-symbols-outlined">domain</span>
                    {app.department}
                  </p>

                  <div className="roadmap-app-specs">
                    <div className="spec-item">
                      <span className="spec-label">SLA Timeline</span>
                      <span className="spec-val">{app.sla}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Statutory Fee</span>
                      <span className="spec-val">{app.fee}</span>
                    </div>
                  </div>

                  <div className="required-docs-strip">
                    <span className="docs-label">Required Documents:</span>
                    <ul className="docs-checklist">
                      {app.requiredDocs.map((doc, dIdx) => (
                        <li key={dIdx}>
                          <span className="material-symbols-outlined">check_small</span>
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="roadmap-app-action">
                    {app.status === 'APPROVED' ? (
                      <Button variant="outline" size="sm" icon="download">
                        Download Sanction Order
                      </Button>
                    ) : app.status === 'ACTION_REQUIRED' ? (
                      <NavLink to="/user/applications">
                        <Button variant="danger" size="sm" iconRight="arrow_forward">
                          Fix & Resubmit
                        </Button>
                      </NavLink>
                    ) : app.status === 'UNDER_REVIEW' ? (
                      <NavLink to="/user/applications">
                        <Button variant="outline" size="sm" icon="visibility">
                          Track Application
                        </Button>
                      </NavLink>
                    ) : (
                      <NavLink to="/user/applications">
                        <Button variant="primary" size="sm" iconRight="arrow_forward">
                          Start Application
                        </Button>
                      </NavLink>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
