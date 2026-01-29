import {
  adminInfoKeys,
  apis,
  type AxiosApiErrorResponse,
  handleErrorMessage,
  USER_API_ENDPOINTS,
  type UserInfo,
} from '@repo/common';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useUserInfo = () => {
  const { data: userInfo, error } = useQuery<UserInfo>({
    queryKey: adminInfoKeys.all(),
    queryFn: async () => {
      const response = await apis.get(USER_API_ENDPOINTS.GET_MEMBER_INFO);
      return response.data;
    },
  });

  useEffect(() => {
    if (error) {
      handleErrorMessage(error as AxiosApiErrorResponse);
    }
  }, [error]);

  return { userInfo };
};
