import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import {
  DEFAULT_LANG,
  LOCAL_STORAGE_NAMES,
  SUPPORTED_MESSAGE,
  type SupportedMessage,
} from '../common';

type NestedTranslationMessages = {
  [key: string]: string | NestedTranslationMessages;
};

const isSupported = (lang: string): lang is SupportedMessage =>
  Object.keys(SUPPORTED_MESSAGE).includes(lang);

function getInitialLang(): SupportedMessage {
  const storedLang = localStorage.getItem(LOCAL_STORAGE_NAMES.LANG);

  // Check LocalStorage
  if (storedLang && isSupported(storedLang)) {
    return storedLang;
  }

  // Check browser language
  const browserLang =
    navigator.language.split?.('-')?.[0]?.toLowerCase?.() ?? '';
  if (isSupported(browserLang)) {
    localStorage.setItem(LOCAL_STORAGE_NAMES.LANG, browserLang);
    return browserLang;
  }

  // Default
  localStorage.setItem(LOCAL_STORAGE_NAMES.LANG, DEFAULT_LANG);
  return DEFAULT_LANG;
}

/**
 * Converts the messages structure to i18next's resources format.
 */
function convertMessagesToI18nResources(
  messages: Record<SupportedMessage, NestedTranslationMessages>
): Record<SupportedMessage, { translation: NestedTranslationMessages }> {
  return Object.fromEntries(
    Object.entries(messages).map(([lang, translation]) => [
      lang,
      { translation },
    ])
  ) as Record<SupportedMessage, { translation: NestedTranslationMessages }>;
}

/**
 * Initializes and returns an i18n instance.
 */
function createI18nInstance({
  messages,
  fallBackLang = DEFAULT_LANG,
}: {
  messages: Record<SupportedMessage, NestedTranslationMessages>;
  fallBackLang?: SupportedMessage;
}) {
  const defaultLang = getInitialLang();

  const resources = convertMessagesToI18nResources(messages);

  i18n.use(initReactI18next).init({
    resources,
    lng: defaultLang,
    fallbackLng: fallBackLang,

    interpolation: {
      escapeValue: false,
    },
  });

  return i18n;
}

export { createI18nInstance, getInitialLang };
