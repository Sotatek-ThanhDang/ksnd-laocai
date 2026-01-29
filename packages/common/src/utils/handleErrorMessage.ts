import type { AxiosApiErrorResponse } from '../types';
import { logout } from './auth';
import { toastError } from './toast';

function getErrorMessage(error: AxiosApiErrorResponse) {
  return error.response?.data.message || error.message;
}

function handleErrorMessage(error: AxiosApiErrorResponse) {
  const message = getErrorMessage(error);

  switch (error.response?.status) {
    case 401:
      toastError(message);
      logout();
      break;
    case 403:
      toastError(message);
      break;
    default:
      toastError(message);
      break;
  }

  return message;
}

export { getErrorMessage, handleErrorMessage };
