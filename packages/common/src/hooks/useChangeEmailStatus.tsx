import {
  apis,
  type AxiosApiErrorResponse,
  EStatusEmailUpdate,
  USER_API_ENDPOINTS,
  userKeys,
} from '@repo/common';
import { useQuery } from '@tanstack/react-query';

import { useHandleQueryError } from './useHandleQueryError';

type ChangeEmailResponse = {
  emailUpdateId: number;
  status: EStatusEmailUpdate;
};

type ChangeEmailStatus = ChangeEmailResponse & {
  currentEmail: string;
  newEmail: string;
};

export function useChangeEmailStatus() {
  const { isError, error, data, isLoading, isFetching, refetch } = useQuery<
    ChangeEmailStatus,
    AxiosApiErrorResponse
  >({
    queryKey: userKeys.details('change-email-status'),
    queryFn: async () => {
      const response = await apis.get<ChangeEmailStatus>(
        USER_API_ENDPOINTS.CHANGE_EMAIL_STATUS
      );
      return response.data;
    },
    staleTime: 0,
  });

  useHandleQueryError({ isError, error });

  return {
    changeEmailStatus: data,
    isChangeEmailStatusLoading: isLoading,
    isEmailStatusFetching: isFetching,
    error: error,
    refetch: refetch,
  };
}
