import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import { I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';

import en from './en.json';
import ar from './ar.json';
import { getAppLanguage, saveAppLanguage } from '../utils/helpers/storage';

const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

const FALLBACK_LANG = 'en';

function applyRTL(lang: 'en' | 'ar') {
  if (lang === 'ar' && !I18nManager.isRTL) {
    I18nManager.forceRTL(true);
    RNRestart.restart();
  } else if (lang === 'en' && I18nManager.isRTL) {
    I18nManager.forceRTL(false);
    RNRestart.restart();
  }
}

async function initI18n() {
  let lang = await getAppLanguage();
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

  applyRTL(lang as 'en' | 'ar');
}

initI18n();

export const changeAppLanguage = async (lang: 'en' | 'ar') => {
  await saveAppLanguage(lang);
  await i18n.changeLanguage(lang);


  applyRTL(lang);
};

export default i18n;
