import React from 'react';
import './Tabs.css';

export default function Tabs({
  tabs = [],
  activeTab,
  onChange,
  className = ''
}) {
  return (
    <div className={`tabs-container ${className}`}>
      <div className="tabs-header" role="tablist">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              className={`tab-item ${isActive ? 'active' : ''}`}
              onClick={() => onChange(tab.id)}
            >
              {tab.icon && <span className="material-symbols-outlined tab-icon">{tab.icon}</span>}
              <span className="tab-label">{tab.label}</span>
              {tab.badge !== undefined && (
                <span className={`tab-badge ${isActive ? 'badge-active' : ''}`}>{tab.badge}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
