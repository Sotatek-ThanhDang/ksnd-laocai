import { toast, type ToastOptions } from 'react-toastify';

import { defaultToastOptions } from '../common/toast-config';

type ToastFunction = typeof toast.success;

const showToast = (
  message: string,
  type: 'success' | 'error' | 'info' | 'warning' | 'default' = 'default', // implement more toast type here
  options?: ToastOptions
) => {
  const finalOptions = { ...defaultToastOptions, ...options };

  const fn = (toast[type as keyof typeof toast] as ToastFunction) ?? toast;

  fn(message, finalOptions);
};

const toastSuccess = (message: string, options?: ToastOptions) =>
  showToast(message, 'success', options);

const toastError = (message: string, options?: ToastOptions) =>
  showToast(message, 'error', options);

export { showToast, toastError, toastSuccess };
