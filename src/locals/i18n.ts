import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './en.json';
import ar from './ar.json';

const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

const FALLBACK_LANG = 'en';
const LANG_KEY = 'APP_LANGUAGE';

async function initI18n() {
  let lang = await AsyncStorage.getItem(LANG_KEY);
  if (!lang) {
    const deviceLang = RNLocalize.getLocales()[0]?.languageCode;
    lang = ['en', 'ar'].includes(deviceLang) ? deviceLang : FALLBACK_LANG;
  }

  i18n.use(initReactI18next).init({
    resources,
    lng: lang,
    fallbackLng: FALLBACK_LANG,
    interpolation: { escapeValue: false },
  });
}

initI18n();

export const changeAppLanguage = async (lang: 'en' | 'ar') => {
  await AsyncStorage.setItem(LANG_KEY, lang);
  await i18n.changeLanguage(lang);
};

export default i18n;
