import { toastError, toastSuccess } from '@repo/common';
import copy from 'copy-to-clipboard';

import i18n from './i18n';

const handleCopyText = async (text: string | undefined) => {
  if (!text) {
    return;
  }

  try {
    copy(text);
    toastSuccess(i18n.t('common.copied'));
  } catch (e: unknown) {
    toastError(i18n.t('common.copyFailed'));
    console.log(e);
  }
};

export { handleCopyText };
