import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { aiService } from '../../services/aiService';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import AIUnavailable from '../../components/state/AIUnavailable';

export default function AIAssistantPage() {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Namaste Rajesh Kumar ji! I am your AmchiSaarthi AI Compliance Assistant. You can ask me any question about Maharashtra Industrial Policy, factory floor approvals, Fire NOC procedures, or MPCB effluent standards.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAiOnline, setIsAiOnline] = useState(true);

  const sampleQueries = [
    'How do I calculate MPCB consent fees for an Orange category agro unit?',
    'What are the mandatory fire safety requirements under Maharashtra Fire Act?',
    'Can I apply for factory electricity load expansion through AmchiSaarthi?',
    'What documents are needed for Trade License renewal in Pune Municipal Corporation?'
  ];

  const handleSend = async (query) => {
    const q = query || input;
    if (!q.trim()) return;

    const userMsg = {
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await aiService.askAssistant(q, language);
      if (res.success) {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: res.answer,
            sources: res.sources,
            disclaimer: res.disclaimer,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        setIsAiOnline(false);
      }
    } catch (err) {
      setIsAiOnline(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">{t('nav.assistant')}</h1>
          <p className="page-subtitle">
            RAG-powered conversational engine referencing statutory acts, gazettes, and official department circulars.
          </p>
        </div>
      </div>

      {!isAiOnline && <AIUnavailable onRetry={() => setIsAiOnline(true)} />}

      <Card style={{ minHeight: '520px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          {messages.map((m, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <div
                style={{
                  maxWidth: '85%',
                  padding: '16px',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: m.sender === 'user' ? 'var(--color-primary)' : 'var(--bg-app)',
                  color: m.sender === 'user' ? '#ffffff' : 'var(--text-primary)',
                  border: m.sender === 'ai' ? '1px solid var(--border-structural)' : 'none',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <p style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>{m.text}</p>

                {m.sources && m.sources.length > 0 && (
                  <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px dashed #cbd5e1' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                      Verified Maharashtra Government Sources:
                    </p>
                    <ul style={{ paddingLeft: '16px', margin: '4px 0 0 0', fontSize: '0.82rem' }}>
                      {m.sources.map((s, sIdx) => (
                        <li key={sIdx}>
                          <a href={s.url} target="_blank" rel="noreferrer" style={{ color: 'var(--color-primary-light)' }}>
                            {s.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {m.disclaimer && (
                  <p style={{ fontSize: '0.75rem', color: '#b45309', backgroundColor: '#fef3c7', padding: '6px 10px', borderRadius: 'var(--radius-sm)', marginTop: '10px' }}>
                    ℹ️ {m.disclaimer}
                  </p>
                )}

                <span style={{ display: 'block', fontSize: '0.7rem', color: m.sender === 'user' ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)', marginTop: '8px', textAlign: 'right' }}>
                  {m.timestamp}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{ padding: '14px 20px', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-structural)' }}>
                <span>Synthesizing statutory guidelines...</span>
              </div>
            </div>
          )}
        </div>

        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
            {sampleQueries.map((sq, sqIdx) => (
              <button
                key={sqIdx}
                onClick={() => handleSend(sq)}
                style={{
                  backgroundColor: 'var(--bg-app)',
                  border: '1px solid var(--border-structural)',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  color: 'var(--color-primary)',
                  cursor: 'pointer'
                }}
              >
                {sq}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            style={{ display: 'flex', gap: '12px' }}
          >
            <input
              type="text"
              className="input-field"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask any statutory clearance question..."
              style={{ flex: 1 }}
            />
            <Button type="submit" variant="primary" icon="send" disabled={!input.trim() || loading}>
              Ask AI
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
