import { useMutation } from '@tanstack/react-query';

import { apis } from '../libs/axios';
import type { AxiosApiErrorResponse } from '../types';

export const useDownloadFile = () => {
  const downloadBlob = (blob: Blob, fileName: string) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      URL.revokeObjectURL(link.href);
      link.remove();
    }, 100);
  };

  const downloadFileMutation = useMutation<
    Blob,
    AxiosApiErrorResponse,
    { url: string; filename: string; params?: unknown }
  >({
    mutationFn: async ({ url, filename, params }) => {
      const response = await apis.get(url, { params, responseType: 'blob' });
      const blob = response.data;

      downloadBlob(blob, filename);

      return blob;
    },
  });

  return { downloadFileMutation, downloadBlob };
};
