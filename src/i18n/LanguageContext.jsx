import React, { createContext, useContext, useState, useEffect } from 'react';
import en from './en.json';
import hi from './hi.json';
import mr from './mr.json';

const translations = { en, hi, mr };

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('amchi_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('amchi_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLanguage = (newLang) => {
    if (translations[newLang]) {
      setLang(newLang);
    }
  };

  const t = (keyPath, defaultVal = '') => {
    if (!keyPath) return '';
    const keys = keyPath.split('.');
    
    // Check in active language
    let current = translations[lang];
    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        current = null;
        break;
      }
    }

    if (current !== null && current !== undefined && typeof current === 'string') {
      return current;
    }

    // Fallback to English
    let fallback = translations.en;
    for (const k of keys) {
      if (fallback && typeof fallback === 'object' && k in fallback) {
        fallback = fallback[k];
      } else {
        fallback = null;
        break;
      }
    }

    if (fallback !== null && fallback !== undefined && typeof fallback === 'string') {
      return fallback;
    }

    return defaultVal || keyPath;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLanguage, t, availableLanguages: ['en', 'hi', 'mr'] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
