// ellanatek/src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import translationEN from './locales/en/translation.json';
import translationAR from './locales/ar/translation.json';

// Define the resources
const resources = {
  en: {
    translation: translationEN
  },
  ar: {
    translation: translationAR
  }
};

i18n
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en', // Default language
    debug: false,

    interpolation: {
      escapeValue: false // React already protects from XSS
    },
    detection: {
      // Order and from where user language should be detected
      order: ['localStorage', 'cookie', 'navigator', 'htmlTag', 'path', 'subdomain'],

      // Keys or params to lookup language from
      caches: ['localStorage', 'cookie']
    }
  });

export default i18n;
