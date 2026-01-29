import { useMutation } from '@tanstack/react-query';

import { PUBLIC_API_ENDPOINTS } from '../../common/apiEndpoints';
import { apis } from '../../libs/axios';
import { type LoginFormValues } from '../../schema/login';
import { type AxiosApiErrorResponse } from '../../types';
import { type TLoginResponse } from '../../types/auth';

export const useLogin = () => {
  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormValues) => {
      const response = await apis.post<TLoginResponse>(
        PUBLIC_API_ENDPOINTS.LOGIN,
        data
      );
      return response.data;
    },
    retry: 0, // not retry on error for count login failed in 3 times and show captcha box
    onError: (error: AxiosApiErrorResponse) => {
      throw error;
    },
  });

  return { loginMutation };
};
export default useLogin;
