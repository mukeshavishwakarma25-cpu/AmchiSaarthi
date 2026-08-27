import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import Card from '../../components/common/Card';

export default function AdminKnowledgeBasePage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setArticles(adminService.getKnowledgeBase());
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 className="page-title">Statutory Knowledge Base & RAG Index</h1>
        <p className="page-subtitle">Indexed Maharashtra Government acts, notifications, and standard operating procedures.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        {articles.map((art) => (
          <Card key={art.id} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-primary-light)', textTransform: 'uppercase' }}>
              {art.category}
            </span>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--color-primary-dark)' }}>{art.title}</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{art.summary}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid var(--border-subtle)' }}>
              <span>Source: {art.source}</span>
              <span>Updated: {art.lastUpdated}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
