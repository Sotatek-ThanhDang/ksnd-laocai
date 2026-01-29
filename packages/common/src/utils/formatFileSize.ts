import { GB, KB, MB } from '../common/file';
import { formatNumber } from './formatNumber';

const formatFileSize = (size: number) => {
  if (size < KB) return `${size} bytes`;
  if (size < MB) return `${formatNumber((size / KB).toFixed(2))} KB`;
  if (size < GB) return `${formatNumber((size / MB).toFixed(2))} MB`;

  return `${formatNumber((size / GB).toFixed(2))} GB`;
};

export { formatFileSize };
