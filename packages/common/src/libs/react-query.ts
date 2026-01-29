import { focusManager, QueryClient } from '@tanstack/react-query';

import type { AxiosApiErrorResponse } from '../types';
import { handleErrorMessage } from '../utils';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
      onError: (error) => handleErrorMessage(error as AxiosApiErrorResponse),
    },
  },
});

// Setup focus manager to listen to window focus events
// This ensures refetch works when switching between applications (not just browser tabs)
focusManager.setEventListener((handleFocus) => {
  function onFocus() {
    handleFocus();
  }

  // Listen to visibilitychange and focus
  if (typeof window !== 'undefined' && window.addEventListener) {
    window.addEventListener('visibilitychange', onFocus, false);
    window.addEventListener('focus', onFocus, false);
  }

  return () => {
    // Be sure to unsubscribe if a new handler is set
    window.removeEventListener('visibilitychange', onFocus);
    window.removeEventListener('focus', onFocus);
  };
});

export { queryClient };
