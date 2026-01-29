import {
  clearLoginFailCount,
  ERROR_CODE,
  getLoginFailCount,
  increaseLoginFailCount,
  MAX_RETRY_LOGIN,
} from '@repo/common';
import { useCallback, useState } from 'react';

import { type AxiosApiErrorResponse } from '../../types';

export const useLoginCaptcha = () => {
  // initialize showCaptchaBox based on login fail count in cookies
  const [showCaptchaBox, setShowCaptchaBox] = useState(() => {
    return getLoginFailCount() >= MAX_RETRY_LOGIN;
  });

  const handleLoginError = useCallback((error: AxiosApiErrorResponse) => {
    const code = error.response?.data?.error_code;

    if (code === ERROR_CODE.LOGIN_FAILED) {
      increaseLoginFailCount();

      if (getLoginFailCount() >= MAX_RETRY_LOGIN) {
        setShowCaptchaBox(true);
      }
    }

    if (code === ERROR_CODE.LOGIN_TEMPORARILY_LOCKED) {
      setShowCaptchaBox(false);
      clearLoginFailCount();
    }
  }, []);

  const resetCaptcha = useCallback(() => {
    setShowCaptchaBox(false);
    clearLoginFailCount();
  }, []);

  return { showCaptchaBox, handleLoginError, resetCaptcha };
};
