import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import AppHeader from '../components/layout/AppHeader';
import AIAssistantDrawer from '../components/ai/AIAssistantDrawer';

const SIDEBAR_EXPANDED = 272;
const SIDEBAR_COLLAPSED = 64;

export default function UserLayout() {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const sidebarWidth = isSidebarCollapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-app)' }}>
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed((c) => !c)}
      />

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          marginLeft: `${sidebarWidth}px`,
          transition: 'margin-left 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <AppHeader
          sidebarWidth={sidebarWidth}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={() => setIsSidebarCollapsed((c) => !c)}
        />
        <main style={{ flex: 1, padding: '24px', overflowY: 'auto', marginTop: '64px' }}>
          <Outlet />
        </main>
      </div>

      {/* Floating AI Assistant Trigger */}
      <button
        onClick={() => setIsAiOpen(true)}
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          backgroundColor: 'var(--color-primary)',
          color: '#ffffff',
          border: 'none',
          borderRadius: 'var(--radius-full)',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: 'var(--shadow-lg)',
          cursor: 'pointer',
          fontWeight: '700',
          fontSize: '0.92rem',
          zIndex: 900,
          transition: 'transform var(--transition-fast)'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        aria-label="Open AI Assistant"
      >
        <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#93c5fd' }}>
          auto_awesome
        </span>
        <span>AI Compliance Assistant</span>
      </button>

      <AIAssistantDrawer isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
    </div>
  );
}
