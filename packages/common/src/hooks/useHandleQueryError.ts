import { useEffect } from 'react';

import type { AxiosApiErrorResponse } from '../types';
import { handleErrorMessage } from '../utils';

export function useHandleQueryError({
  isError,
  error,
}: {
  isError: boolean;
  error: AxiosApiErrorResponse | null;
}) {
  useEffect(() => {
    if (isError && error) {
      handleErrorMessage(error);
    }
  }, [isError, error]);

  return null;
}
