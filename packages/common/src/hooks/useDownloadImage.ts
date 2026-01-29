import { useCallback, useState } from 'react';

import { apis } from '../libs';
import { toastError } from '../utils';
import { useDownloadFile } from './useDowloadFile';

type DownloadOptions = {
  fileName?: string;
};

function getFileNameFromUrl(url: string) {
  try {
    const newUrl = new URL(url);
    const lastPath =
      newUrl.pathname.split('/').filter(Boolean).pop() ?? 'image';
    return lastPath.includes('.') ? lastPath : `${lastPath}.jpg`;
  } catch {
    return 'image.jpg';
  }
}

export function useDownloadImage() {
  const [downloadingUrl, setDownloadingUrl] = useState<string | null>(null);
  const { downloadBlob } = useDownloadFile();

  const downloadImage = useCallback(
    async (url: string, options?: DownloadOptions) => {
      if (!url) return;

      const fileName = options?.fileName ?? getFileNameFromUrl(url);

      setDownloadingUrl(url);
      try {
        const res = await apis.get(url, { responseType: 'blob' });
        if (res.status < 200 || res.status >= 300) {
          toastError(`Download failed: ${res.status}`);
          return;
        }
        const blob = res.data;
        downloadBlob(blob, fileName);
      } catch (err) {
        toastError(`Download failed: ${err}`);
      } finally {
        setDownloadingUrl(null);
      }
    },
    []
  );

  return { downloadImage, downloadingUrl };
}
