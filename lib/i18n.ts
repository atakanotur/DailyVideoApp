import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

import en from '@/locales/en.json';
import tr from '@/locales/tr.json';

const i18n = new I18n({
  en,
  'en-TR': tr,
  'tr-TR': tr,
  'en-US': tr,
});

i18n.locale = Localization.getLocales()[0].languageTag;
i18n.enableFallback = true;

export default i18n;
