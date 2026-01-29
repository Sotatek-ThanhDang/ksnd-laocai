const SUPPORTED_MESSAGE = {
  vi: 'vi',
  en: 'en',
} as const;

type SupportedMessage = keyof typeof SUPPORTED_MESSAGE;

const DEFAULT_LANG = SUPPORTED_MESSAGE.vi;

export { DEFAULT_LANG, SUPPORTED_MESSAGE, type SupportedMessage };
