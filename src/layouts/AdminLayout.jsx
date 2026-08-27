import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import AppHeader from '../components/layout/AppHeader';

const SIDEBAR_EXPANDED = 272;
const SIDEBAR_COLLAPSED = 64;

export default function AdminLayout() {
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
    </div>
  );
}
