import {
  createI18nInstance,
  LOCAL_STORAGE_NAMES,
  type SupportedMessage,
} from '@repo/common';

import en from '@/lang/en.json';
import vi from '@/lang/vi.json';

const i18n = createI18nInstance({
  messages: {
    vi,
    en,
  },
});

export const changeLang = (lang: SupportedMessage) => {
  localStorage.setItem(LOCAL_STORAGE_NAMES.LANG, lang);
  i18n.changeLanguage(lang);
};

export default i18n;
