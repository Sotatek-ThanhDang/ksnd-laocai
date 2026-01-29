import { type ToastContainerProps, type ToastOptions } from 'react-toastify';

const defaultToastOptions: ToastOptions = {
  position: 'bottom-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'colored',
} as const;

const defaultToastProps: ToastContainerProps = {
  ...defaultToastOptions,
  position: 'top-right',
  newestOnTop: true,
  rtl: false,
  pauseOnFocusLoss: true,
} as const;

export { defaultToastOptions, defaultToastProps };
