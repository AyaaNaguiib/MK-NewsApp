import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import en from './en.json';
import ar from './ar.json';

const resources: Record<string, { translation: any }> = {
  en: { translation: en },
  ar: { translation: ar },
};

const fallback = 'en';

const locales = RNLocalize.getLocales();

let languageTag = fallback;

if (Array.isArray(locales) && locales.length > 0) {
  const deviceLanguage = locales[0].languageCode; 
  if (Object.keys(resources).includes(deviceLanguage)) {
    languageTag = deviceLanguage;
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: languageTag,
  fallbackLng: fallback,
  interpolation: { escapeValue: false },
});

export default i18n;

