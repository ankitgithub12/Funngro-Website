import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en    from './locales/en.json';
import hi    from './locales/hi.json';
import hiEn  from './locales/hi-en.json';

i18n
  .use(LanguageDetector)          // auto-detect browser language
  .use(initReactI18next)          // pass i18n down to react-i18next
  .init({
    resources: {
      en:    { translation: en    },
      hi:    { translation: hi    },
      'hi-en': { translation: hiEn },
    },

    // Default language
    fallbackLng: 'en',

    // Language detection order
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'funngro_lang',
    },

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    // Supported languages
    supportedLngs: ['en', 'hi', 'hi-en'],
  });

export default i18n;

/** Helper — get a display label for a language code */
export const LANG_LABELS = {
  en:    { label: 'EN',    full: 'English',  script: 'Latin'     },
  'hi-en': { label: 'Hi-En', full: 'Hinglish', script: 'Devanagari+Latin' },
  hi:    { label: 'हिं',   full: 'Hindi',    script: 'Devanagari' },
};
