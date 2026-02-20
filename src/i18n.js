import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import esTranslations from './locales/es.json';
import enTranslations from './locales/en.json';

const resources = {
  es: {
    translation: esTranslations
  },
  en: {
    translation: enTranslations
  }
};

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    fallbackLng: 'es', // Spanish as default language
    lng: 'es', // Default language
    debug: false, // Set to true during development for debugging
    
    detection: {
      // Order of language detection methods
      order: ['localStorage', 'navigator', 'htmlTag'],
      // Cache user language on localStorage
      caches: ['localStorage']
    },

    interpolation: {
      escapeValue: false // React already escapes by default
    },

    // React i18next options
    react: {
      useSuspense: false
    }
  });

export default i18n;