import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import './LanguageSwitcher.css';

const langLabels = { en: 'English', hi: 'हिंदी', mr: 'मराठी' };

export default function LanguageSwitcher() {
  const { lang, setLanguage, availableLanguages } = useLanguage();

  return (
    <div className="lang-switcher" role="group" aria-label="Language Selector">
      {availableLanguages.map((code) => (
        <button
          key={code}
          className={`lang-btn ${lang === code ? 'active' : ''}`}
          onClick={() => setLanguage(code)}
          aria-pressed={lang === code}
          lang={code}
        >
          {langLabels[code]}
        </button>
      ))}
    </div>
  );
}
