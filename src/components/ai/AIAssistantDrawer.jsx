import React, { useState } from 'react';
import { aiService } from '../../services/aiService';
import { useLanguage } from '../../i18n/LanguageContext';
import Button from '../common/Button';
import './AIAssistantDrawer.css';

export default function AIAssistantDrawer({ isOpen, onClose }) {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: t('assistant.greeting') || 'Namaste! I am your AmchiSaarthi AI Compliance Assistant. Ask me anything about Maharashtra business approvals, acts, or document checklists.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const suggestedQuestions = [
    'How do I get a Municipal Trade License?',
    'What are MPCB Consent to Establish criteria?',
    'Do I need a Fire NOC for 600 sq.m unit?'
  ];

  const handleSend = async (queryText) => {
    const textToSend = queryText || input;
    if (!textToSend.trim()) return;

    const userMsg = {
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await aiService.askAssistant(textToSend, language);
      const aiMsg = {
        sender: 'ai',
        text: response.answer || response.message,
        sources: response.sources || [],
        disclaimer: response.disclaimer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'Unable to connect to AI engine. Please check your network or try again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="ai-drawer-backdrop" onClick={onClose}>
      <div className="ai-drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="ai-drawer-header">
          <div className="ai-drawer-title-group">
            <div className="ai-drawer-icon-wrap">
              <span className="material-symbols-outlined">smart_toy</span>
            </div>
            <div>
              <h3 className="ai-drawer-title">{t('nav.assistant')}</h3>
              <span className="ai-status-indicator">
                <span className="dot online"></span> {t('assistant.onlineStatus') || 'AI Active • Advisory Only'}
              </span>
            </div>
          </div>
          <button className="ai-drawer-close" onClick={onClose} aria-label="Close Assistant">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="ai-drawer-body">
          <div className="ai-messages-list">
            {messages.map((m, idx) => (
              <div key={idx} className={`ai-message-bubble-row ${m.sender === 'user' ? 'user-row' : 'ai-row'}`}>
                <div className={`ai-message-bubble ${m.sender === 'user' ? 'user-bubble' : 'ai-bubble'}`}>
                  <p className="message-text">{m.text}</p>

                  {m.sources && m.sources.length > 0 && (
                    <div className="message-sources">
                      <p className="sources-title">Verified Sources:</p>
                      <ul>
                        {m.sources.map((s, sIdx) => (
                          <li key={sIdx}>
                            <a href={s.url} target="_blank" rel="noreferrer">
                              {s.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {m.disclaimer && (
                    <p className="message-disclaimer">
                      ⚠️ {m.disclaimer}
                    </p>
                  )}
                  <span className="message-time">{m.timestamp}</span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="ai-message-bubble-row ai-row">
                <div className="ai-message-bubble ai-bubble loading-bubble">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            )}
          </div>

          <div className="ai-suggestions-tray">
            <p className="suggestions-label">{t('assistant.suggestedQueries') || 'Suggested Questions:'}</p>
            <div className="suggestions-pills">
              {suggestedQuestions.map((sq, sqIdx) => (
                <button
                  key={sqIdx}
                  className="suggestion-pill-btn"
                  onClick={() => handleSend(sq)}
                >
                  {sq}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="ai-drawer-footer">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="ai-chat-input-form"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('assistant.inputPlaceholder') || 'Ask about rules, licenses, documents...'}
              className="ai-chat-input"
            />
            <Button
              type="submit"
              variant="primary"
              disabled={!input.trim() || loading}
              icon="send"
            >
              {t('assistant.send') || 'Ask'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
